"use client"
import { Github, Youtube, UserIcon, Home, User, Briefcase, Mail, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const navigationButtons = [
    {
      href: "/",
      icon: <Home size={16} />,
      label: "Home",
    },
    {
      href: "https://github.com/uidq",
      icon: <Briefcase size={16} />,
      label: "Projects",
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
        
        <div className="hidden md:flex items-center gap-1">
          {navigationButtons.map((button, index) => (
            <Link
              key={index}
              href={button.href}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-[#e0e0e0] text-sm font-medium"
            >
              {button.icon}
              <span>{button.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
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
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-zinc-800 transition-colors text-[#e0e0e0]"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#181818] border-t border-zinc-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-2 mb-4">
              {navigationButtons.map((button, index) => (
                <Link
                  key={index}
                  href={button.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-zinc-800 transition-colors text-[#e0e0e0] text-base font-medium"
                >
                  {button.icon}
                  <span>{button.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
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
        </div>
      )}
    </nav>
  )
}
