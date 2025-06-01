"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type SidebarContextType = {
  isOpen: boolean
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available, otherwise default to open
  const [isOpen, setIsOpen] = useState(true)

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarOpen")
    if (savedState !== null) {
      setIsOpen(savedState === "true")
    }
  }, [])

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen.toString())
  }, [isOpen])

  const toggle = () => setIsOpen((prev) => !prev)

  return <SidebarContext.Provider value={{ isOpen, toggle }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
