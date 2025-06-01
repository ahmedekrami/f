"use client"

import Link from "next/link"
import { Heart, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  const footerSections = [
    {
      title: "About",
      links: [
        { label: "Our Mission", href: "/about" },
        { label: "Team", href: "/team" },
        { label: "Careers", href: "/careers" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "Features",
      links: [
        { label: "Nutrition Tracking", href: "/nutrition" },
        { label: "Activity Monitor", href: "/activity" },
        { label: "Sleep Analysis", href: "/sleep" },
        { label: "Water Reminder", href: "/water" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Recipes", href: "/recipes" },
        { label: "Workout Plans", href: "/workouts" },
        { label: "Health Tips", href: "/tips" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Community", href: "/community" },
        { label: "Feedback", href: "/feedback" },
      ],
    },
  ]

  return (
    <footer className="bg-[#03045e] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <Heart className="h-8 w-8 text-[#00b4de]" />
              <span className="text-xl font-bold">Health Pulse</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your comprehensive health companion for tracking nutrition, monitoring sleep, staying hydrated, and
              maintaining an active lifestyle.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="w-10 h-10 bg-[#0077b6] rounded-full flex items-center justify-center hover:bg-[#00b4de] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#0077b6] rounded-full flex items-center justify-center hover:bg-[#00b4de] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#0077b6] rounded-full flex items-center justify-center hover:bg-[#00b4de] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-[#00b4de]">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-gray-300 hover:text-[#00b4de] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-[#0077b6] mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Mail className="h-5 w-5 text-[#00b4de]" />
              <span className="text-gray-300">support@healthpulse.com</span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Phone className="h-5 w-5 text-[#00b4de]" />
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <MapPin className="h-5 w-5 text-[#00b4de]" />
              <span className="text-gray-300">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#0077b6] pt-6 text-center">
          <p className="text-gray-300">
            © 2024 Health Pulse. All rights reserved. | Made with ❤️ for your health journey.
          </p>
        </div>
      </div>
    </footer>
  )
}
