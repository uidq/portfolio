"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { TerminalIcon } from "lucide-react"


type Command = {
  input: string
  output: React.ReactNode
  timestamp: Date
}

type TerminalProps = {
  variant?: "window" | "inline"
  className?: string
}

export default function Terminal({ variant = "window", className }: TerminalProps) {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<Command[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    if (!isInitialized) {
      const welcomeOutput = (
        <div className="space-y-4 text-white">
          <p>Welcome.</p>
          <div className="space-y-2">
            <div><span className="text-white">projects</span> - Show project history</div>
            <div><span className="text-white">friends</span> - Show friends</div>
            <div><span className="text-white">about</span> - About information</div>
            <div><span className="text-white">links</span> - Social links</div>
            <div><span className="text-white">media</span> - Media gallery</div>
            <div><span className="text-white">cat</span> - Show a random cat</div>
            <div><span className="text-white">clear</span> - Clear terminal</div>
            <div><span className="text-white">help</span> - Show available commands</div>
          </div>
        </div>
      )
      setCommandHistory([{
        input: "",
        output: welcomeOutput,
        timestamp: new Date()
      }])
      setIsInitialized(true)
    }
  }, [isInitialized])

  useEffect(() => {
    inputRef.current?.focus()

    if (variant === "window") {
      const handleClick = () => {
        inputRef.current?.focus()
      }

      document.addEventListener("click", handleClick)

      return () => {
        document.removeEventListener("click", handleClick)
      }
    }
  }, [variant])

  useEffect(() => {
    scrollToBottom()
  }, [commandHistory, currentSection, scrollToBottom])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const command = input.trim().toLowerCase()
    let output: React.ReactNode

    switch (command) {
      case "help":
        output = (
          <div className="space-y-2 text-white">
            <div><span className="text-white">projects</span> - Show project history</div>
            <div><span className="text-white">friends</span> - Show friends</div>
            <div><span className="text-white">about</span> - About information</div>
            <div><span className="text-white">links</span> - Social links</div>
            <div><span className="text-white">media</span> - Media gallery</div>
            <div><span className="text-white">cat</span> - Show a random cat</div>
            <div><span className="text-white">clear</span> - Clear terminal</div>
            <div><span className="text-white">help</span> - Show available commands</div>
          </div>
        )
        setCurrentSection(null)
        break
  
      case "projects":
        output = <ProjectsSection />
        setCurrentSection("projects")
        break

      case "friends":
        output = <FriendsSection />
        setCurrentSection("friends")
        break

      case "about":
        output = <AboutSection />
        setCurrentSection("about")
        break

      case "links":
        output = <LinksSection />
        setCurrentSection("links")
        break

      case "cat":
        output = <CatSection />
        setCurrentSection("cat")
        break

    case "media":
        output = <MediaSection />
        setCurrentSection("media")
        break

      case "clear":
        setCommandHistory([])
        setCurrentSection(null)
        setInput("")
        return

      default:
        output = (
          <p className="text-white">
            Command not found: {command}. Type <span className="text-white font-bold">help</span> to see available
            commands.
          </p>
        )
        setCurrentSection(null)
    }

    setCommandHistory((prev) => [
      ...prev,
      {
        input: command,
        output,
        timestamp: new Date(),
      },
    ])

    setInput("")
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  const isInline = variant === "inline"

  const containerClasses = [
    isInline
      ? "w-full max-w-2xl rounded-2xl border border-[#ffdeeb]/40 bg-black/60 backdrop-blur pointer-events-auto p-4 flex flex-col gap-4"
      : "flex flex-col h-full",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const historyClasses = isInline
    ? "max-h-64 overflow-y-auto font-mono text-sm pr-1 border-b border-[#ffdeeb]/30 pb-4"
    : "flex-1 bg-black border-x border-[#ffdeeb] p-4 overflow-y-auto font-mono text-sm"

  const footerClasses = isInline
    ? "flex items-center font-mono text-sm"
    : "bg-black border border-[#ffdeeb] rounded-b-md p-2"

  return (
    <div className={containerClasses}>
      {!isInline && (
        <div className="bg-black border border-[#ffdeeb] rounded-t-md p-2 flex items-center">
          <TerminalIcon className="h-4 w-4 text-white mr-2" />
          <span className="text-sm font-mono text-white">
            uid meow
          </span>
        </div>
      )}

      <div
        ref={terminalRef}
        className={historyClasses}
      >
        {commandHistory.map((cmd, index) => (
          <div key={index} className="mb-4 last:mb-0">
            {cmd.input && (
              <div className="flex items-center text-white/70">
                <span className="text-white mr-2">$</span>
                <span>{cmd.input}</span>
              </div>
            )}
            <div className={cmd.input ? "mt-1 ml-4 text-white" : "text-white"}>{cmd.output}</div>
          </div>
        ))}
      </div>

      <div className={footerClasses}>
        {!isInline && <span className="text-white mr-2">$</span>}
        {isInline && <span className="text-[#ffdeeb] mr-2 text-base">$</span>}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center">
          {isInline && (
            <span className="sr-only">Command prompt</span>
          )}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none font-mono text-white placeholder-white/40"
            aria-label="Terminal input"
            autoComplete="off"
            spellCheck="false"
            placeholder={isInline ? "Type a command and hit enter (try 'help')" : undefined}
          />
        </form>
      </div>
    </div>
  )
}

function ProjectsSection() {
    return (
      <div className="space-y-2 text-white">
        <p>
          Personal projects
        </p>
        <p className="text-[#ffdeeb]">
          cs2 external <span className="text-red-500">(discontinued)</span>
        </p>
        <p className="text-[#ffdeeb]">
          rust dma <span className="text-red-500">(discontinued)</span> 
        </p>
        <p className="text-[#ffdeeb]">
          tf2 internal <span className="text-red-500">(discontinued)</span>
        </p>
        <p className="text-[#ffdeeb]">
          arc raiders dma
        </p>
      </div>
  )
}

function FriendsSection() {
  return (
    <div className="space-y-2 text-white">
      <p className="text-[#ffdeeb]">
        saika <span className="text-white">- he wanted to be here (really cool guy tho)</span>
      </p>
    </div>
  )
}

function AboutSection() {
  return (
    <div className="space-y-2 text-white">
      <p>
        Self taught software developer from finland. 🇫🇮 
      </p>
    </div>
  )
}

function LinksSection() {
  return (
    <div className="space-y-2 text-white">
      <div className="space-y-2">
        <div>
          <a href="https://github.com/uidq" className="underline text-[#ffdeeb] hover:text-[#ffdeeb]/80" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </div>
        <div>
          <a href="https://discord.com/users/944567752159535104" className="underline text-[#ffdeeb] hover:text-[#ffdeeb]/80" target="_blank" rel="noopener noreferrer">
            Discord
          </a>
        </div>
        <div>
          <a href="https://youtube.com/@cooluid" className="underline text-[#ffdeeb] hover:text-[#ffdeeb]/80" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
        </div>
      </div>
    </div>
  )
}

function MediaSection() {
  return (
    <div className="space-y-2 text-white">
      <a href="/meow" className="underline text-[#ffdeeb] hover:text-[#ffdeeb]/80">Open Media Library</a>
    </div>
  )
}

function CatSection() {
  const cacheBustedCatUrl = `https://cataas.com/cat?timestamp=${Date.now()}`

  return (
    <div className="space-y-3 text-white">
      <p>Fresh cat for you:</p>
      <img
        src={cacheBustedCatUrl}
        alt="Random cat from cataas.com"
        className="max-w-xs rounded-lg border border-[#ffdeeb]/40"
        loading="lazy"
      />
      <p className="text-xs text-white/60">
        Source: <a href="https://cataas.com/cat" target="_blank" rel="noreferrer" className="underline text-[#ffdeeb]">cataas.com</a>
      </p>
    </div>
  )
}