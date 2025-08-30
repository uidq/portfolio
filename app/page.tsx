"use client"
import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import {
  Cat,
  Sparkles,
  Code2,
  FileCode,
  Palette,
  Server,
  Terminal,
  Type,
  Volume2,
  VolumeX,
  Goal,
  Database,
  Code2Icon,
} from "lucide-react"
import { Title } from "@/components/pre-made/stars"
import { GSAPWrapper } from "@/components/pre-made/gsap-wrapper"
import { TextGenerateEffect } from "@/components/pre-made/text"
import { Knowledge } from "@/components/ui/knowledge"

const words = `Meow meow meow mrrp meow i like cats meow meow meow mrrp meow mrrp meow`

const DiscordActivity = dynamic(
  () => import("@/components/ui/discord").then((mod) => ({ default: mod.DiscordActivity })),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-zinc-800 rounded-lg h-48" />,
  },
)

const GitHubProjects = dynamic(
  () => import("@/components/ui/github").then((mod) => ({ default: mod.GitHubProjects })),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-zinc-800 rounded-lg h-48" />,
  },
)

const Friends = dynamic(() => import("@/components/ui/friends").then((mod) => ({ default: mod.Friends })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-zinc-800 rounded-lg h-32" />,
})

const Spotify = dynamic(() => import("@/components/ui/spotify").then((mod) => ({ default: mod.Spotify })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-zinc-800 rounded-lg h-32" />,
})

const DISCORD_ID = "944567752159535104"
const DISCORD_USERNAME = "uid"

const aboutMe = {
  techStack: [
    { name: "React", icon: <Code2 size={14} /> },
    { name: "TypeScript", icon: <Type size={14} /> },
    { name: "Lua", icon: <Code2 size={14} /> },
    { name: "Next.js", icon: <FileCode size={14} /> },
    { name: "TailwindCSS", icon: <Palette size={14} /> },
    { name: "Node.js", icon: <Server size={14} /> },
    { name: "Python", icon: <Terminal size={14} /> },
    { name: "GO", icon: <Goal size={14} /> },
    { name: "PostgreSQL", icon: <Database size={14} /> },
    { name: "MySQL", icon: <Database size={14} /> },
    { name: "Docker", icon: <Database size={14} /> },
    { name: "Git", icon: <Database size={14} /> },
    { name: "Rust", icon: <Code2Icon size={14} /> },
  ],
  currentFocus: "Meow meow meow meow meow meow",
}

const friends = [
  {
    name: "Elias",
    avatar: "",
    role: "Developer",
    link: "https://github.com/eliasmoflag",
    projects: [
      {
        name: "Aether",
        description: "A open-source counter-strike 2 cheat",
        link: "https://github.com/eliasmoflag/aether",
      },
      {
        name: "Source 2 Dumper",
        description: "Well... i dont have anything to add here, its a source 2 dumper.",
        link: "https://github.com/eliasmoflag/source2-dumper",
      },
      {
        name: "net-syringe",
        description: "Proof-of-Concept server-assisted DLL manual mapping written in Rust",
        link: "https://github.com/eliasmoflag/net-syringe",
      },
    ],
  },
]

const MusicPlayer = ({
  showOverlay,
  setShowOverlay,
}: { showOverlay: boolean; setShowOverlay: (show: boolean) => void }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState("")
  const [currentSongName, setCurrentSongName] = useState("")
  const [currentSongLink, setCurrentSongLink] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const audioRef = useRef(null)

  const playlist = [
    {
      url: "https://r2.fivemanage.com/ymIhalK0qgovsxPVnry4A/bladeeEcco2kThaiboyDigitalTLDR(OfficialVideo).mp3",
      name: "bladee, Ecco2k, Thaiboy - TL;DR",
      link: "https://www.youtube.com/watch?v=JiwpG284QPk&list=RDJiwpG284QPk&start_radio=1&pp=ygUPdGhhaWJveSBkaWdpdGFsoAcB",
    },
    {
      url: "https://r2.fivemanage.com/ymIhalK0qgovsxPVnry4A/fakemink-UnderYourSkin(ProdMeClearo).mp3",
      name: "fakemink - Under Your Skin",
      link: "https://www.youtube.com/watch?v=QmsAudPaSxY&list=RDQmsAudPaSxY&start_radio=1&pp=ygUPdW5kZXIgeW91ciBza2luoAcB",
    },
    {
      url: "https://r2.fivemanage.com/ymIhalK0qgovsxPVnry4A/fakemink-Crying(ProdMe).mp3",
      name: "fakemink - Crying",
      link: "https://www.youtube.com/watch?v=JLAnZ42o7sM&list=RDJLAnZ42o7sM&start_radio=1&pp=ygUPQ3J5aW5nIGZha2VtaW5roAcB0gcJCccJAYcqIYzv",
    },
  ]

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * playlist.length)
    const selectedSong = playlist[randomIndex]
    setCurrentSong(selectedSong.url)
    setCurrentSongName(selectedSong.name)
    setCurrentSongLink(selectedSong.link)

    if (audioRef.current) {
      ;(audioRef.current as HTMLAudioElement).volume = 0.1
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        ;(audioRef.current as HTMLAudioElement).pause()
      } else {
        ;(audioRef.current as HTMLAudioElement).play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const enterWebsite = () => {
    setShowOverlay(false)
    if (audioRef.current) {
      ;(audioRef.current as HTMLAudioElement).play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/95 via-zinc-900/90 to-black/95 backdrop-blur-md transition-all duration-700 cursor-pointer overflow-hidden"
          onClick={enterWebsite}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#ffdeeb]/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#ffdeeb]/15 rounded-full blur-lg animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#ffdeeb]/5 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 text-center space-y-8 p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-5xl font-bold text-white tracking-tight animate-fade-in">
                Welcome
              </h1>
              <p className="text-2xl md:text-3xl text-[#e0e0e0] font-light animate-fade-in-delay-1">
                to qtie.dev
              </p>
            </div>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#ffdeeb] to-transparent mx-auto animate-expand"></div>

            <p className="text-lg text-zinc-400 font-medium animate-fade-in-delay-2">
             Did you know that if you take your mouse, and click anywhere on the screen, you will get in? neither did i. i found about it today :3
            </p>

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#ffdeeb]/60 rounded-full animate-float-1"></div>
              <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-[#ffdeeb]/40 rounded-full animate-float-2"></div>
              <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-[#ffdeeb]/50 rounded-full animate-float-3"></div>
            </div>
          </div>
        </div>
      )}

      {!showOverlay && isPlaying && (
        <div
          className={`fixed ${isScrolled ? "top-4" : "top-20"} left-1/2 transform -translate-x-1/2 z-30 w-full px-4 pointer-events-none transition-all duration-300 ease-in-out`}
        >
          <div className="bg-[#232323]/50 border border-zinc-700/50 rounded-full px-4 py-2 text-[#e0e0e0]/60 text-sm font-medium shadow-lg flex items-center gap-2 justify-center max-w-sm mx-auto">
            <Volume2 size={16} className="text-[#ffdeeb] flex-shrink-0" />
            <span className="flex-shrink-0">Playing: </span>
            <a
              href={currentSongLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffdeeb] font-bold hover:text-white transition-colors duration-200 underline text-xs sm:text-sm break-words pointer-events-auto"
              title={currentSongName}
            >
              {currentSongName}
            </a>
          </div>
        </div>
      )}

      {!showOverlay && (
        <button
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-40 p-3 bg-[#232323] border border-zinc-800 rounded-full text-[#e0e0e0] hover:bg-zinc-800 transition-all duration-200 shadow-lg"
        >
          {isPlaying ? (
            <Volume2 size={24} className="text-[#e0e0e0]" />
          ) : (
            <VolumeX size={24} className="text-[#e0e0e0]" />
          )}
        </button>
      )}

      <audio ref={audioRef} loop src={currentSong} />
    </>
  )
}

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(true)

  return (
    <div className="relative min-h-screen text-white">
      <MusicPlayer showOverlay={showOverlay} setShowOverlay={setShowOverlay} />

      <div className="fixed top-10 right-10 text-[#ffdeeb] opacity-5">
        <Cat size={24} />
      </div>
      <div className="fixed bottom-10 left-10 text-[#ffdeeb] opacity-5">
        <Cat size={24} />
      </div>

      {!showOverlay && (
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-24 relative z-10">
          <GSAPWrapper animation="slideUp" className="mb-16">
            <header data-aos="fade-down" data-aos-duration="1200">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="space-y-2">
                  <GSAPWrapper animation="fadeIn">
                    <h1
                      className="text-4xl md:text-5xl flex items-center group"
                      data-aos="fade-right"
                      data-aos-delay="200"
                    >
                      <div className="uid-text relative inline-block">
                        <Title />
                      </div>
                    </h1>
                  </GSAPWrapper>
                  <GSAPWrapper animation="slideRight">
                    <p className="text-gray-400 text-sm" data-aos="fade-right" data-aos-delay="400">
                      also known as{" "}
                      <span className="text-[#e0e0e0] inline-flex items-center">
                        @32dbg
                        <Sparkles size={12} className="ml-1 text-[#e0e0e0]" />
                      </span>
                    </p>
                  </GSAPWrapper>
                </div>
              </div>
            </header>
          </GSAPWrapper>

          <GSAPWrapper animation="scale" className="mb-16">
            <section
              className="bg-[#ffdeeb]/10 backdrop-blur-sm border border-zinc-800/25 rounded-xl p-4 hover:border-[#ffdeeb]/15 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <GSAPWrapper animation="fadeIn">
                <p
                  className="text-[#e0e0e0] text-base md:text-lg leading-relaxed font-bold"
                  data-aos="fade-in"
                  data-aos-delay="500"
                >
                  Hey! My name is uid <Cat size={16} className="inline text-[#e0e0e0]" />
                  <br />
                  {!showOverlay && <TextGenerateEffect duration={20} filter={false} words={words} />}
                </p>
              </GSAPWrapper>
              <GSAPWrapper animation="slideUp">
                <p
                  className="text-[#e0e0e0] flex items-center flex-wrap text-base md:text-lg mt-4"
                  data-aos="fade-in"
                  data-aos-delay="700"
                >
                  Oh, and if you haven't figured it out yet...{" "}
                  <span className="font-semibold flex items-center mx-1">I love cats. ᓚᘏᗢ</span>
                </p>
              </GSAPWrapper>
            </section>
          </GSAPWrapper>

          <GSAPWrapper animation="fadeIn" className="mb-16">
            <section data-aos="fade-up" data-aos-delay="400">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <GSAPWrapper animation="slideRight">
                    <div className="space-y-4" data-aos="slide-right" data-aos-delay="600">
                      <DiscordActivity discordId={DISCORD_ID} discordUsername={DISCORD_USERNAME} />
                    </div>
                  </GSAPWrapper>

                  <section data-aos="slide-right" data-aos-delay="800">
                    <Friends friends={friends} />
                  </section>
                </div>

                <div className="space-y-8">
                  <GSAPWrapper animation="slideLeft">
                    <div className="space-y-4" data-aos="slide-left" data-aos-delay="600">
                      <GitHubProjects username="uidq" limit={3} />
                    </div>
                  </GSAPWrapper>

                  <section data-aos="fade-up" data-aos-delay="900">
                    <Knowledge techStack={aboutMe.techStack} currentFocus={aboutMe.currentFocus} />
                  </section>

                  <section data-aos="slide-left" data-aos-delay="1000">
                    <Spotify
                      playlistUrl="https://open.spotify.com/embed/playlist/6qPLsn2yb7VTC7dV1DDmEh?utm_source=generator&theme=0"
                    />
                  </section>
                </div>
              </div>
            </section>
          </GSAPWrapper>
        </div>
      )}
    </div>
  )
}