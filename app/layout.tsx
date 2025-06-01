import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { SidebarProvider } from "@/contexts/sidebar-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Health Pulse - Your Comprehensive Health Companion",
  description:
    "Track your nutrition, monitor your sleep, stay hydrated, and maintain an active lifestyle with Health Pulse.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
