"use client"
import { Github, Youtube, UserIcon, Cat, Heart, Mail } from "lucide-react"
import { Button } from "@/components/pre-made/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const socialLinks = [
    {
      href: "https://github.com/uidq",
      icon: <Github size={16} />,
      label: "GitHub",
    },
    {
      href: "https://youtube.com/@cooluid",
      icon: <Youtube size={16} />,
      label: "YouTube",
    },
    {
      href: "https://discord.com/users/944567752159535104",
      icon: <i className="fa-brands fa-discord"></i>,
      label: "Discord",
    },
  ]

  return (
    <footer className="w-full bg-[#181818] border-t border-zinc-800 rounded-t-xl shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-2">
        <div className="flex items-center gap-2 text-[#e0e0e0] text-sm">
          <Cat size={16} className="text-[#e0e0e0]" />
          <span className="font-semibold">qtie.dev</span>
          <span className="text-xs text-zinc-500">© {currentYear}</span>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-zinc-800 transition-colors text-[#e0e0e0]"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}