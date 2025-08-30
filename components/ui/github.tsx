"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/pre-made/card"
import { Code, Star, GitFork, Clock, ExternalLink, Github } from "lucide-react"

interface GitHubProjectsProps {
  username: string
  limit?: number
}

export function GitHubProjects({ username, limit = 6 }: GitHubProjectsProps) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`)

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const data = await response.json()
        setProjects(data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch GitHub projects")
        setLoading(false)
      }
    }

    fetchProjects()
  }, [username, limit])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 30) {
      return `${diffDays} days ago`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} ${months === 1 ? "month" : "months"} ago`
    } else {
      const years = Math.floor(diffDays / 365)
      return `${years} ${years === 1 ? "year" : "years"} ago`
    }
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      Java: "bg-orange-500",
      HTML: "bg-red-500",
      CSS: "bg-purple-500",
      "C#": "bg-green-700",
      Go: "bg-blue-400",
      Ruby: "bg-red-600",
      PHP: "bg-indigo-400",
      Rust: "bg-orange-600",
      Swift: "bg-orange-500",
      Kotlin: "bg-purple-400",
    }

    return colors[language] || "bg-gray-500"
  }

  if (error) {
    return (
      <div className="bg-[#ffdeeb]/10 backdrop-blur-sm border border-zinc-800/25 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
            <Github size={16} className="text-rose-400" />
          </div>
          <p className="text-rose-400 text-sm">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#ffdeeb]/10 backdrop-blur-sm border border-zinc-800/25 rounded-xl p-4 hover:border-[#ffdeeb]/15 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ffdeeb]/10 flex items-center justify-center">
            <Github size={16} className="text-[#ffdeeb]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">My GitHub Projects</h3>
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
                <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-zinc-700/50 group-hover:ring-[#ffdeeb]/30 transition-all duration-300">
                  <Image
                    src={`https://github.com/${username}.png?size=128`}
                    alt="GitHub Avatar"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    unoptimized={true}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold text-lg group-hover:text-[#ffdeeb] transition-colors duration-300">
                  {username}
                </h4>
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-400 text-sm hover:text-[#ffdeeb] transition-colors duration-300"
                >
                  <Github size={12} />
                  View Profile
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="group/project bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-4 hover:border-[#ffdeeb]/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#ffdeeb]/10 flex items-center justify-center">
                        <Code size={14} className="text-[#ffdeeb]" />
                      </div>
                      <div className="flex-1">
                        <a
                          href={project.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-medium hover:text-[#ffdeeb] transition-colors duration-300 flex items-center gap-1"
                        >
                          {project.name}
                          <ExternalLink
                            size={12}
                            className="opacity-0 group-hover/project:opacity-100 transition-opacity"
                          />
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-zinc-400 text-xs">
                          <Star size={12} className="text-[#ffdeeb]" />
                          {project.stargazers_count}
                        </div>
                        <div className="flex items-center gap-1 text-zinc-400 text-xs">
                          <GitFork size={12} className="text-[#ffdeeb]" />
                          {project.forks_count}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 ml-11">
                      {project.description && <p className="text-zinc-400 text-sm">{project.description}</p>}
                      <div className="flex items-center gap-3 text-xs">
                        {project.language && (
                          <div className="flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${getLanguageColor(project.language)}`}></span>
                            <span className="text-zinc-500">{project.language}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-zinc-500">
                          <Clock size={12} className="text-[#ffdeeb]" />
                          <span>Updated {formatDate(project.updated_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-zinc-400 text-sm">No repositories found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
}
