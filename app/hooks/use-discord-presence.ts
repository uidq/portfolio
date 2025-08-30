"use client"

import { useState, useEffect, useRef } from "react"

interface DiscordUser {
  discord_user: {
    id: string
    username: string
    avatar: string
    discriminator: string
    public_flags: number
  }
  discord_status: "online" | "idle" | "dnd" | "offline"
  activities: Array<{
    name: string
    type: number
    state?: string
    details?: string
    timestamps?: {
      start?: number
      end?: number
    }
    assets?: {
      large_image?: string
      large_text?: string
      small_image?: string
      small_text?: string
    }
  }>
  listening_to_spotify: boolean
  spotify?: {
    track_id: string
    timestamps: {
      start: number
      end: number
    }
    album: string
    album_art_url: string
    artist: string
    song: string
  }
}

export function useDiscordPresence(discordId: string) {
  const [presenceData, setPresenceData] = useState<DiscordUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch Discord presence")
        }
        const data = await response.json()
        if (data.success) {
          setPresenceData(data.data)
        } else {
          throw new Error("API returned unsuccessful response")
        }
      } catch (err) {
        console.error("Initial fetch error:", err)
        setError("Failed to load Discord presence")
      } finally {
        setLoading(false)
      }
    }

    const pollInterval = setInterval(() => {
      fetchPresence()
    }, 30000)

    fetchPresence()

    const setupWebSocket = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close()
      }

      const ws = new WebSocket("wss://api.lanyard.rest/socket")
      wsRef.current = ws

      ws.onopen = () => {
        console.log("WebSocket connected")
        ws.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_ids: [discordId],
            },
          })
        )
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.op === 1) {
          const heartbeatInterval = data.d.heartbeat_interval

          if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current)
          }
          
          heartbeatIntervalRef.current = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(
                JSON.stringify({
                  op: 3,
                })
              )
            } else {
              if (heartbeatIntervalRef.current) {
                clearInterval(heartbeatIntervalRef.current)
              }
            }
          }, heartbeatInterval)
        }

        if (data.op === 0 && data.t === "PRESENCE_UPDATE" && data.d.user_id === discordId) {
          console.log("Presence update received:", data.d)
          setPresenceData(prevData => {
            if (JSON.stringify(prevData) !== JSON.stringify(data.d)) {
              return data.d
            }
            return prevData
          })
        }

        if (data.op === 0 && data.t === "INIT_STATE") {
          const userData = data.d[discordId]
          if (userData) {
            console.log("Initial state received:", userData)
            setPresenceData(userData)
          }
        }
      }

      ws.onerror = (error) => {
        console.error("WebSocket error:", error)
        setError("WebSocket connection error")
      }

      ws.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason)
        
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current)
        }
        
        if (!event.wasClean) {
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
          }
          
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("Attempting to reconnect...")
            setupWebSocket()
          }, 3000)
        }
      }
    }

    setupWebSocket()

    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close()
      }
      
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current)
      }
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      
      clearInterval(pollInterval)
    }
  }, [discordId])

  const refreshPresence = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch Discord presence")
      }
      const data = await response.json()
      if (data.success) {
        setPresenceData(data.data)
      } else {
        throw new Error("API returned unsuccessful response")
      }
    } catch (err) {
      console.error("Refresh error:", err)
      setError("Failed to refresh Discord presence")
    } finally {
      setLoading(false)
    }
  }

  return { presenceData, loading, error, refreshPresence }
}