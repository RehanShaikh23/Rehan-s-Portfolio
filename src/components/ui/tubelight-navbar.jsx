import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"

export function TubelightNavBar({ items, className }) {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update active tab based on current route
  useEffect(() => {
    const currentItem = items.find(item => item.url === location.pathname)
    if (currentItem) {
      setActiveTab(currentItem.name)
    } else if (items.length > 0) {
      // Default to first item if no match found
      setActiveTab(items[0].name)
    }
  }, [location.pathname, items])

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-1 bg-white/10 border border-white/20 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-200",
                "text-white/70 hover:text-white",
                isActive && "text-white",
              )}
            >
              <span className="hidden md:inline relative z-10">{item.name}</span>
              <span className="md:hidden relative z-10">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full rounded-full -z-0"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Main glow background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-teal-300/20 rounded-full" />
                  
                  {/* Top tubelight effect */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-teal-400 to-teal-300 rounded-t-full shadow-lg">
                    {/* Outer glow */}
                    <div className="absolute w-12 h-6 bg-teal-400/30 rounded-full blur-md -top-2 -left-2" />
                    {/* Middle glow */}
                    <div className="absolute w-8 h-4 bg-teal-300/40 rounded-full blur-sm -top-1 left-0" />
                    {/* Inner highlight */}
                    <div className="absolute w-4 h-2 bg-teal-200/50 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}