"use client"
import Image from "next/image"
import { Github, Heart, User2, Loader2, Star } from "lucide-react"
import { Card, CardContent } from "@/components/pre-made/card"
import { useState, useEffect } from "react"

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
}

interface Project {
  name: string
  description: string
  link: string
}

interface Friend {
  name: string
  avatar: string
  role: string
  link: string
  projects?: Project[]
}

interface FriendsProps {
  friends: Friend[]
}

async function fetchGitHubRepos(url: string): Promise<GitHubRepo[]> {
  const match = url.match(/github\.com\/([^\/]+)/)
  const username = match ? match[1] : null
  
  if (!username) {
    return []
  }
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
    if (!response.ok) {
      throw new Error(`Failed to fetch repos for ${username}`)
    }
    const repos = await response.json()
    return repos
      .filter((repo: any) => !repo.fork && repo.description)
      .slice(0, 5)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language
      }))
  } catch (error) {
    console.error(`Error fetching repos for ${username}:`, error)
    return []
  }
}

export function Friends({ friends }: FriendsProps) {
  const [friendRepos, setFriendRepos] = useState<Record<string, GitHubRepo[]>>({})
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const [errorStates, setErrorStates] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchAllRepos = async () => {
      const newLoadingStates: Record<string, boolean> = {}
      const newErrorStates: Record<string, boolean> = {}
      const newFriendRepos: Record<string, GitHubRepo[]> = {}

      friends.forEach(friend => {
        if (friend.link.includes('github.com')) {
          newLoadingStates[friend.name] = true
          newErrorStates[friend.name] = false
        }
      })

      setLoadingStates(newLoadingStates)

      for (const friend of friends) {
        if (friend.link.includes('github.com')) {
          try {
            const repos = await fetchGitHubRepos(friend.link)
            newFriendRepos[friend.name] = repos
            newLoadingStates[friend.name] = false
          } catch (error) {
            newErrorStates[friend.name] = true
            newLoadingStates[friend.name] = false
          }
        }
      }

      setFriendRepos(newFriendRepos)
      setLoadingStates(newLoadingStates)
      setErrorStates(newErrorStates)
    }

    fetchAllRepos()
  }, [friends])

  return (
    <div className="bg-[#ffdeeb]/10 backdrop-blur-sm border border-zinc-800/25 rounded-xl p-4 hover:border-[#ffdeeb]/15 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ffdeeb]/10 flex items-center justify-center">
            <Heart size={16} className="text-[#ffdeeb]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Friends</h3>
          </div>
        </div>

        <hr className="border-0 h-px bg-gradient-to-r from-transparent via-[#ffdeeb]/10 to-transparent mb-6" />

        <div className="space-y-6">
          {friends.map((friend, idx) => {
            const repos = friendRepos[friend.name] || []
            const isLoading = loadingStates[friend.name] || false
            const hasError = errorStates[friend.name] || false
            const isGitHubUser = friend.link.includes('github.com')

            return (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-zinc-700/50 group-hover:ring-[#ffdeeb]/30 transition-all duration-300">
                      {friend.avatar ? (
                        <Image
                          src={friend.avatar}
                          alt={friend.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          unoptimized={true}
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800/50 flex items-center justify-center">
                          <User2 size={24} className="text-[#ffdeeb]" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg group-hover:text-[#ffdeeb] transition-colors duration-300">
                      {isGitHubUser ? (
                        <a
                          href={friend.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#ffdeeb] transition-colors duration-300"
                        >
                          {friend.name}
                        </a>
                      ) : (
                        friend.name
                      )}
                    </h4>
                    <p className="text-zinc-400 text-sm">{friend.role}</p>
                  </div>
                </div>

                <div className="space-y-3 ml-20">
                  {isLoading && (
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">Loading repositories...</span>
                    </div>
                  )}

                  {hasError && (
                    <div className="text-zinc-400 text-sm">
                      Failed to load repositories
                    </div>
                  )}

                  {!isLoading && !hasError && repos.length === 0 && isGitHubUser && (
                    <div className="text-zinc-400 text-sm">
                      No public repositories found
                    </div>
                  )}

                  {!isLoading && !hasError && repos.map((repo) => (
                    <div
                      key={repo.name}
                      className="group/project bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-4 hover:border-[#ffdeeb]/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-[#ffdeeb]/10 flex items-center justify-center">
                          <Github size={12} className="text-[#ffdeeb]" />
                        </div>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-medium hover:text-[#ffdeeb] transition-colors duration-300"
                        >
                          {repo.name}
                        </a>
                        {repo.stargazers_count > 0 && (
                          <span className="text-zinc-400 text-xs flex items-center gap-1">
                            <Star size={12} className="text-[#ffdeeb]" />
                            {repo.stargazers_count}
                          </span>
                        )}
                        {repo.language && (
                          <span className="text-zinc-400 text-xs bg-zinc-800/50 px-2 py-1 rounded">
                            {repo.language}
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-400 text-sm ml-9">{repo.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
}