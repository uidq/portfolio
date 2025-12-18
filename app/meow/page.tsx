"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Video {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
}

const videos: Video[] = [
  {
    id: "1",
    title: "chudvision rust",
    url: "/media/chudster.mp4",
    description: "i never uploaded it to youtube idk",
    thumbnail: "/media/rust_thumbnail.png",
  },
  {
    id: "2",
    title: "chudvision arc raiders",
    url: "/media/arc_raiders.mp4",
    description: "Embark apparently loves to copyright videos",
    thumbnail: "/media/arc_raiders_thumbnail.png",
  },
  {
    id: "3",
    title: "chudding in arc raiders for 10 minutes",
    url: "/media/arc_raiders2.mp4",
    description: "Watch my 10 minute video :3",
    thumbnail: "/media/kana.png",
  },
  {
    id: "4",
    title: "chudvision eft",
    url: "/media/chudvision_eft.mp4",
    description: "Russian roleplay simulator",
    thumbnail: "/media/eft_thumbnail.png",
  },
];

function VideoThumbnail({ video, onClick }: { video: Video; onClick: () => void }) {
  const [thumbnail, setThumbnail] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video.thumbnail) {
      setThumbnail(video.thumbnail);
      return;
    }

    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleLoadedData = () => {
      videoEl.currentTime = 1;
    };

    const handleSeeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        setThumbnail(canvas.toDataURL());
      }
    };

    videoEl.addEventListener("loadeddata", handleLoadedData);
    videoEl.addEventListener("seeked", handleSeeked);

    return () => {
      videoEl.removeEventListener("loadeddata", handleLoadedData);
      videoEl.removeEventListener("seeked", handleSeeked);
    };
  }, [video.thumbnail]);

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden rounded-lg bg-[#1e1e1e] border border-[#ffdeeb]/20">
        <div className="relative aspect-video bg-black">
          {!video.thumbnail && (
            <video
              ref={videoRef}
              src={video.url}
              className="hidden"
              preload="metadata"
              muted
            />
          )}
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1e1e1e]">
              <div className="w-6 h-6 border-2 border-[#ffdeeb]/30 border-t-[#ffdeeb] rounded-full animate-spin" />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-base font-medium text-white mb-1">{video.title}</h3>
          <p className="text-gray-400 text-sm">{video.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function MediaPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = 0.15;
    }
  }, [selectedVideo]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#121212]">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold text-center mb-3 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Media Library
        </motion.h1>
        
        <motion.p
          className="text-center text-gray-400 text-base mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Watch my videos
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <VideoThumbnail
                video={video}
                onClick={() => setSelectedVideo(video)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#ffdeeb]/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-[#ffdeeb]/30 flex items-center justify-center hover:bg-black/70 transition-all duration-200"
                aria-label="Close video"
              >
                <X className="w-4 h-4 text-[#ffdeeb]" />
              </button>

              <div className="aspect-video bg-black">
                <video
                  ref={playerRef}
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="p-5">
                <h2 className="text-lg font-medium text-white mb-1">{selectedVideo.title}</h2>
                <p className="text-gray-400 text-sm">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
