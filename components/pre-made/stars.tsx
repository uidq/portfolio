"use client"

import { Star, Sparkles } from "lucide-react"

export function Title() {
  return (
    <div className="relative inline-block">
      <span className="bg-gradient-to-b from-[#ffdeeb] via-[#ffdeeb]/80 to-[#ffdeeb]/60 bg-clip-text text-transparent shimmer-effect">
        uid
      </span>

      <div className="absolute inset-0 pointer-events-none">
        <div className="star-orbit" style={{ animationDuration: "8s" }}>
          <Sparkles size={10} className="text-[#ffdeeb]" />
        </div>

        <div className="star-orbit" style={{ animationDuration: "10s", animationDelay: "-2.5s" }}>
          <Star size={8} className="text-[#ffdeeb]" />
        </div>

        <div className="star-orbit" style={{ animationDuration: "7s", animationDelay: "-1.5s" }}>
          <Sparkles size={12} className="text-[#ffdeeb]" />
        </div>

        <div className="star-orbit" style={{ animationDuration: "12s", animationDelay: "-4s" }}>
          <Star size={6} className="text-[#ffdeeb]" />
        </div>
      </div>

      <style jsx>{`
        .star-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          animation: rotate linear infinite;
        }
        
        .star-orbit > :global(*) {
          position: absolute;
          transform: translate(-50%, -50%) translateX(100px);
          animation: twinkle 2s ease-in-out infinite;
        }
        
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) translateX(30px) scale(0.8); }
          50% { opacity: 1; transform: translate(-50%, -50%) translateX(30px) scale(1.2); }
        }
      `}</style>
    </div>
  )
}

