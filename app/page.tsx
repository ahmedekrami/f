"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Download,
  Heart,
  Droplets,
  Utensils,
  Activity,
  Moon,
  Brain,
  TrendingUp,
  Users,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import LandingHeader from "@/components/landing-header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function HomePage() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Moon,
      title: t("features.sleep.title"),
      description: t("features.sleep.desc"),
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Droplets,
      title: t("features.hydration.title"),
      description: t("features.hydration.desc"),
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Utensils,
      title: t("features.nutrition.title"),
      description: t("features.nutrition.desc"),
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Activity,
      title: t("features.activity.title"),
      description: t("features.activity.desc"),
      color: "bg-red-100 text-red-600",
    },
  ]

  const benefits = [
    { icon: Utensils, title: t("benefits.meals"), color: "text-green-600" },
    { icon: Moon, title: t("benefits.sleep"), color: "text-purple-600" },
    { icon: Droplets, title: t("benefits.hydration"), color: "text-blue-600" },
    { icon: Activity, title: t("benefits.exercise"), color: "text-red-600" },
    { icon: Brain, title: t("benefits.mindfulness"), color: "text-indigo-600" },
    { icon: TrendingUp, title: t("benefits.tracking"), color: "text-orange-600" },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section id="home" className="gradient-bg-primary text-white py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left rtl:lg:text-right"
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight hero-title">{t("hero.title")}</h1>
              <p className="text-xl lg:text-2xl mb-8 text-gray-200 hero-subtitle">{t("hero.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start rtl:lg:justify-end">
                <Button size="lg" className="bg-[#00b4de] hover:bg-[#0077b6] text-white btn-primary">
                  <Download className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
                  {t("hero.download")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#03045e] btn-secondary"
                >
                  {t("hero.learn")}
                  <ArrowRight className="ml-2 h-5 w-5 rtl:ml-0 rtl:mr-2" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-[#00b4de] rounded-full flex items-center justify-center animate-pulse-slow">
                  <Heart className="w-32 h-32 lg:w-40 lg:h-40 text-white animate-bounce-slow" />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#90e0ef] rounded-full flex items-center justify-center animate-bounce">
                  <Activity className="w-8 h-8 text-[#03045e]" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#caf0f8] rounded-full flex items-center justify-center animate-pulse">
                  <Droplets className="w-6 h-6 text-[#0077b6]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#caf0f8]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-[#03045e] mb-8">{t("about.title")}</h2>
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-12">{t("about.description")}</p>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-[#90e0ef] rounded-full flex items-center justify-center">
                <Users className="w-24 h-24 text-[#03045e]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-[#03045e] mb-4">{t("features.title")}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover hover-scale">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#03045e] mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Focus Section */}
      <section className="py-20 bg-[#90e0ef]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="w-80 h-80 mx-auto bg-[#caf0f8] rounded-full flex items-center justify-center">
                <Utensils className="w-32 h-32 text-[#03045e]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 text-center lg:text-left rtl:lg:text-right"
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-[#03045e] mb-6">{t("nutrition.title")}</h2>
              <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">{t("nutrition.description")}</p>
              <Link href="/nutrition">
                <Button size="lg" className="bg-[#0077b6] hover:bg-[#00b4de] btn-primary">
                  Start Tracking
                  <ArrowRight className="ml-2 h-5 w-5 rtl:ml-0 rtl:mr-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-[#03045e] mb-4">{t("benefits.title")}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-hover hover-scale">
                  <CardContent className="p-6 text-center">
                    <benefit.icon className={`w-12 h-12 mx-auto mb-4 ${benefit.color}`} />
                    <h3 className="text-lg font-semibold text-[#03045e]">{benefit.title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 gradient-bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Ready to Transform Your Health?</h2>
            <p className="text-xl mb-8 text-gray-200">
              Join thousands of users who have already started their health journey with Health Pulse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="bg-[#00b4de] hover:bg-[#0077b6] btn-primary">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 rtl:ml-0 rtl:mr-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#03045e] btn-secondary"
              >
                <Smartphone className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
                Download App
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
