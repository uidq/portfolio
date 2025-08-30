"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/pre-made/card"
import { Badge } from "@/components/pre-made/badge"
import { useDiscordPresence } from "@/app/hooks/use-discord-presence"
import { Cat, MessageCircle, Headphones, PaintRoller as GameController, Code, Clock, Sparkles, Play } from "lucide-react"

interface DiscordActivityProps {
  discordId: string
  discordUsername: string
}

interface ActivityIconProps {
  type: number
}

interface StatusIndicatorProps {
  status: string
}

interface SpotifyActivityProps {
  spotify: {
    song: string
    artist: string
    album: string
    album_art_url?: string
  }
}

interface MainActivityProps {
  activity: {
    type: number
    name: string
    details?: string
    state?: string
    timestamps?: {
      start?: number
      end?: number
    }
  }
  elapsedTime: string
}

const ActivityIcon = ({ type }: ActivityIconProps) => {
  const icons = {
    0: <Play size={14} className="text-[#ffdeeb]" />,
    1: <MessageCircle size={14} className="text-[#ffdeeb]" />,
    2: <Headphones size={14} className="text-[#ffdeeb]" />,
    3: <Cat size={14} className="text-[#ffdeeb]" />,
    4: <Play size={14} className="text-[#ffdeeb]" />,
    5: <Play size={14} className="text-[#ffdeeb]" />,
  }
  return icons[type as keyof typeof icons] || <Code size={14} className="text-[#ffdeeb]" />
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const statusColors = {
    online: "bg-emerald-400",
    idle: "bg-amber-400",
    dnd: "bg-rose-400",
    offline: "bg-zinc-500",
  }
  return (
    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
      <div className={`w-2.5 h-2.5 rounded-full ${statusColors[status as keyof typeof statusColors]}`} />
    </div>
  )
}

const SpotifyActivity = ({ spotify }: SpotifyActivityProps) => (
  <div className="group/spotify bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/25 rounded-xl p-4 hover:border-[#ffdeeb]/15 transition-all duration-300">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-lg bg-[#ffdeeb]/10 flex items-center justify-center">
        <Headphones size={16} className="text-[#ffdeeb]" />
      </div>
      <div className="flex-1">
        <p className="text-zinc-300 text-sm font-medium">Listening to Spotify</p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      {spotify.album_art_url && (
        <div className="relative">
          <div className="w-12 h-12 rounded-lg overflow-hidden ring-1 ring-zinc-700/50 group-hover/spotify:ring-[#ffdeeb]/30 transition-all duration-300">
            <Image
              src={spotify.album_art_url || "/placeholder.svg"}
              alt="Album Art"
              width={48}
              height={48}
              className="w-full h-full object-cover"
              unoptimized={true}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{spotify.song}</p>
        <p className="text-zinc-400 text-xs truncate">by {spotify.artist}</p>
        <p className="text-zinc-500 text-xs truncate">on {spotify.album}</p>
      </div>
    </div>
  </div>
)

const MainActivity = ({ activity, elapsedTime }: MainActivityProps) => {
  const activityTypes = {
    0: "Playing",
    1: "Streaming",
    2: "Listening to",
    3: "Watching",
    4: "",
    5: "Competing in",
  }

  return (
    <div className="group/activity bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/25 rounded-xl p-4 hover:border-[#ffdeeb]/15 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#ffdeeb]/10 flex items-center justify-center">
          <ActivityIcon type={activity.type} />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium">
            {activityTypes[activity.type as keyof typeof activityTypes]} {activity.name}
          </p>
        </div>
      </div>

      <div className="space-y-1 ml-11">
        {activity.details && <p className="text-zinc-400 text-sm">{activity.details}</p>}
        {activity.state && <p className="text-zinc-400 text-sm">{activity.state}</p>}
        {elapsedTime && (
          <div className="flex items-center gap-2 text-zinc-500 text-xs mt-2">
            <Clock size={12} className="text-[#ffdeeb]" />
            <span>{elapsedTime} elapsed</span>
          </div>
        )}
      </div>
    </div>
  )
}

export function DiscordActivity({ discordId, discordUsername }: DiscordActivityProps) {
  const { presenceData, loading, error } = useDiscordPresence(discordId)
  const [elapsedTime, setElapsedTime] = useState<string>("")

  useEffect(() => {
    if (!presenceData?.activities?.length) return

    const activity =
      presenceData.activities.find((act) => !(presenceData.listening_to_spotify && act.name === "Spotify")) ||
      presenceData.activities[0]

    if (!activity.timestamps?.start) return

    const startTimestamp = activity.timestamps.start
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimestamp
      const hours = Math.floor(elapsed / 3600000)
      const minutes = Math.floor((elapsed % 3600000) / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)

      setElapsedTime(`${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(interval)
  }, [presenceData])

  if (error) {
    return (
      <Card className="bg-zinc-950/90 backdrop-blur-sm border border-zinc-800/25 rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
              <Cat size={16} className="text-rose-400" />
            </div>
            <p className="text-rose-400 text-sm">Error: {error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const nonSpotifyActivities =
    presenceData?.activities?.filter(
      (activity) => !(presenceData.listening_to_spotify && activity.name === "Spotify"),
    ) || []

  const mainActivity = nonSpotifyActivities[0]

  return (
    <div className="bg-[#ffdeeb]/10 backdrop-blur-sm border border-zinc-800/25 rounded-xl p-4 hover:border-[#ffdeeb]/15 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ffdeeb]/10 flex items-center justify-center">
            <i className="fa-brands fa-discord text-[#ffdeeb] text-lg"></i>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Discord</h3>
          </div>
        </div>
        
        <hr className="border-0 h-px bg-gradient-to-r from-transparent via-[#ffdeeb]/10 to-transparent mb-6" />

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="relative">
              <div className="w-8 h-8 rounded-full border-2 border-[#ffdeeb]/20 border-t-[#ffdeeb] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#ffdeeb]/50 animate-pulse" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                {presenceData?.discord_user?.avatar ? (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-zinc-700/50 group-hover:ring-[#ffdeeb]/30 transition-all duration-300">
                    <Image
                      src={`https://cdn.discordapp.com/avatars/${discordId}/${presenceData.discord_user.avatar}.png?size=128`}
                      alt="Discord Avatar"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized={true}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center ring-2 ring-zinc-700/50 group-hover:ring-[#ffdeeb]/30 transition-all duration-300">
                    <Cat size={24} className="text-[#ffdeeb]" />
                  </div>
                )}
                <StatusIndicator status={presenceData?.discord_status || "offline"} />
              </div>

              <div className="flex-1">
                <h4 className="text-white font-semibold text-lg group-hover:text-[#ffdeeb] transition-colors duration-300">
                  {discordUsername}
                </h4>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium mt-1 ${
                    presenceData?.discord_status === "online"
                      ? "border-emerald-400/30 text-emerald-400 bg-emerald-400/10"
                      : presenceData?.discord_status === "idle"
                        ? "border-amber-400/30 text-amber-400 bg-amber-400/10"
                        : presenceData?.discord_status === "dnd"
                          ? "border-rose-400/30 text-rose-400 bg-rose-400/10"
                          : "border-zinc-500/30 text-zinc-400 bg-zinc-500/10"
                  }`}
                >
                  {presenceData?.discord_status === "online"
                    ? "Online"
                    : presenceData?.discord_status === "idle"
                      ? "Away"
                      : presenceData?.discord_status === "dnd"
                        ? "Do Not Disturb"
                        : "Offline"}
                </Badge>
              </div>
            </div>

            {(mainActivity || (presenceData?.listening_to_spotify && presenceData.spotify)) && (
              <div className="space-y-4">
                {mainActivity && <MainActivity activity={mainActivity} elapsedTime={elapsedTime} />}

                {presenceData?.listening_to_spotify && presenceData.spotify && (
                  <SpotifyActivity spotify={presenceData.spotify} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
}
