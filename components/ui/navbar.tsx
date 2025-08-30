"use client"
import { Github, Youtube, UserIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const navLinks = [
    {
      href: "https://youtube.com/@cooluid",
      icon: <Youtube size={18} />,
      label: "YouTube",
    },
    {
      href: "https://github.com/uidq",
      icon: <Github size={18} />,
      label: "GitHub",
    },
    {
      href: "https://discord.com/users/944567752159535104",
      icon: <i className="fa-brands fa-discord"></i>,
      label: "Discord",
    },
  ]

  return (
    <nav className="w-full bg-[#181818] border-b border-zinc-800 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-14 px-4">
        <Link href="/" className="flex items-center gap-2 text-[#e0e0e0] font-semibold text-lg">
          <Image
            src="https://r2.fivemanage.com/ymIhalK0qgovsxPVnry4A/Removal-129.png"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-cover rounded-full"
            unoptimized={true}
          />
          qtie.dev
        </Link>
        <div className="flex items-center gap-3">
          {navLinks.map((link, index) => (
            <a
              key={index}
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
    </nav>
  )
}
