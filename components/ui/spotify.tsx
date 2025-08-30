"use client"
import { Music } from "lucide-react"

interface SpotifyProps {
  playlistUrl: string
  title?: string
  description?: string
}

export function Spotify({
  playlistUrl,
  title = "Listen to breakcore",
  description = "Heres like 300+ tracks of breakcore",
}: SpotifyProps) {
  return (
      <div className="bg-[#ffdeeb]/10 backdrop-blur-sm border border-zinc-800/25 rounded-xl p-4 hover:border-[#ffdeeb]/15 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-[#ffdeeb]/10 border border-[#ffdeeb]/20">
            <Music size={20} className="text-[#ffdeeb]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="text-sm text-zinc-400">{description}</p>
          </div>
        </div>

        <hr className="border-0 h-px bg-gradient-to-r from-transparent via-[#ffdeeb]/10 to-transparent mb-6" />

        <div className="rounded-3xl overflow-hidden bg-zinc-900/50 border-5 border-[#ffdeeb]/30 hover:border-[#ffdeeb]/30 transition-all duration-300">
          <iframe
            src={playlistUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full"
            title="Spotify Playlist"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
      </div>
    )
}
