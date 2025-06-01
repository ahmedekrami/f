"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.nutrition": "Nutrition",
    "nav.activity": "Activity",
    "nav.sleep": "Sleep",
    "nav.water": "Water",
    "nav.login": "Login",
    "nav.logout": "Logout",

    // Hero Section
    "hero.title": "Improve Your Daily Health with Our Integrated Platform",
    "hero.subtitle":
      "Track your nutrition, monitor your sleep, stay hydrated, and maintain an active lifestyle with Health Pulse - your comprehensive health companion.",
    "hero.download": "Download App",
    "hero.learn": "Learn More",

    // About Section
    "about.title": "About Health Pulse",
    "about.description":
      "Our mission is to empower individuals to take control of their health through comprehensive tracking and personalized insights. We believe that small daily habits lead to significant long-term health improvements.",

    // Features
    "features.title": "Key Features",
    "features.sleep.title": "Sleep Monitoring",
    "features.sleep.desc": "Track your sleep patterns and quality for better rest",
    "features.hydration.title": "Hydration Tracking",
    "features.hydration.desc": "Monitor your daily water intake and stay hydrated",
    "features.nutrition.title": "Healthy Food",
    "features.nutrition.desc": "Log your meals and track nutritional goals",
    "features.activity.title": "Physical Activity",
    "features.activity.desc": "Record workouts and monitor your fitness progress",

    // Nutrition Focus
    "nutrition.title": "Monitor Your Eating Habits",
    "nutrition.description":
      "Take control of your nutrition with our comprehensive food tracking system. Log meals, track calories, and achieve your health goals.",

    // Benefits
    "benefits.title": "Nourish Your Body",
    "benefits.meals": "Balanced Meals",
    "benefits.sleep": "Quality Sleep",
    "benefits.hydration": "Proper Hydration",
    "benefits.exercise": "Regular Exercise",
    "benefits.mindfulness": "Mindfulness",
    "benefits.tracking": "Progress Tracking",

    // Auth
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.name": "Full Name",
    "auth.signin": "Sign In",
    "auth.signup": "Sign Up",
    "auth.social": "Or continue with",

    // Dashboard
    "dashboard.title": "Health Dashboard",
    "dashboard.welcome": "Welcome back!",
    "dashboard.calories": "Calories Today",
    "dashboard.water": "Water Intake",
    "dashboard.sleep": "Sleep Hours",
    "dashboard.steps": "Steps",
    "dashboard.goal": "Goal",
    "dashboard.remaining": "Remaining",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.add": "Add",
    "common.today": "Today",
    "common.week": "This Week",
    "common.month": "This Month",

    // Dashboard specific
    "dashboard.overview": "Dashboard Overview",
    "dashboard.greeting": "Hello",
    "dashboard.subtitle": "Have a nice day and don't forget to take care of your health!",
    "dashboard.learn_more": "Learn more",
    "dashboard.fitness_activity": "Fitness Activity",
    "dashboard.bike": "Bike",
    "dashboard.run": "Run",
    "dashboard.walking": "Walking",
    "dashboard.yesterday": "Yesterday",
    "dashboard.hours_sleep": "Hours of sleep",
    "dashboard.reminders": "Reminders",
    "dashboard.stretching": "Stretching",
    "dashboard.mind_training": "Mind training",
    "dashboard.reports": "Reports",
    "dashboard.weight_loss": "Weight loss",
    "dashboard.decrease": "decrease",
    "dashboard.general_health": "General health",
    "dashboard.increase": "increase",
    "dashboard.goals_achievement": "You have achieved 86% of your goals this month",

    // Health metrics
    "metrics.steps": "Steps taken",
    "metrics.water": "Water taken",
    "metrics.heart_rate": "Heart Rate",
    "metrics.calories": "Calories burned",
    "metrics.blood_sugar": "Blood Sugar",
    "metrics.blood_pressure": "Blood Pressure",
  },
  ar: {
    // Navbar
    "nav.home": "الرئيسية",
    "nav.dashboard": "لوحة التحكم",
    "nav.nutrition": "التغذية",
    "nav.activity": "النشاط",
    "nav.sleep": "النوم",
    "nav.water": "الماء",
    "nav.login": "تسجيل الدخول",
    "nav.logout": "تسجيل الخروج",

    // Hero Section
    "hero.title": "حسّن صحتك اليومية مع منصتنا المتكاملة",
    "hero.subtitle":
      "تتبع تغذيتك، راقب نومك، حافظ على ترطيبك، واستمر في نمط حياة نشط مع Health Pulse - رفيقك الصحي الشامل.",
    "hero.download": "تحميل التطبيق",
    "hero.learn": "اعرف المزيد",

    // About Section
    "about.title": "حول Health Pulse",
    "about.description":
      "مهمتنا هي تمكين الأفراد من السيطرة على صحتهم من خلال التتبع الشامل والرؤى الشخصية. نؤمن أن العادات اليومية الصغيرة تؤدي إلى تحسينات صحية كبيرة على المدى الطويل.",

    // Features
    "features.title": "الميزات الرئيسية",
    "features.sleep.title": "مراقبة النوم",
    "features.sleep.desc": "تتبع أنماط نومك وجودته للحصول على راحة أفضل",
    "features.hydration.title": "تتبع الترطيب",
    "features.hydration.desc": "راقب كمية الماء اليومية وحافظ على ترطيبك",
    "features.nutrition.title": "الطعام الصحي",
    "features.nutrition.desc": "سجل وجباتك وتتبع أهدافك الغذائية",
    "features.activity.title": "النشاط البدني",
    "features.activity.desc": "سجل التمارين وراقب تقدمك في اللياقة",

    // Nutrition Focus
    "nutrition.title": "راقب عاداتك الغذائية",
    "nutrition.description":
      "تحكم في تغذيتك مع نظام تتبع الطعام الشامل. سجل الوجبات، تتبع السعرات، وحقق أهدافك الصحية.",

    // Benefits
    "benefits.title": "اعتن بجسمك",
    "benefits.meals": "وجبات متوازنة",
    "benefits.sleep": "نوم جيد",
    "benefits.hydration": "ترطيب مناسب",
    "benefits.exercise": "تمارين منتظمة",
    "benefits.mindfulness": "اليقظة الذهنية",
    "benefits.tracking": "تتبع التقدم",

    // Auth
    "auth.login": "تسجيل الدخول",
    "auth.register": "إنشاء حساب",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.name": "الاسم الكامل",
    "auth.signin": "دخول",
    "auth.signup": "إنشاء حساب",
    "auth.social": "أو تابع مع",

    // Dashboard
    "dashboard.title": "لوحة الصحة",
    "dashboard.welcome": "مرحباً بعودتك!",
    "dashboard.calories": "السعرات اليوم",
    "dashboard.water": "شرب الماء",
    "dashboard.sleep": "ساعات النوم",
    "dashboard.steps": "الخطوات",
    "dashboard.goal": "الهدف",
    "dashboard.remaining": "المتبقي",

    // Common
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.add": "إضافة",
    "common.today": "اليوم",
    "common.week": "هذا الأسبوع",
    "common.month": "هذا الشهر",

    // Dashboard specific
    "dashboard.overview": "نظرة عامة على لوحة التحكم",
    "dashboard.greeting": "مرحباً",
    "dashboard.subtitle": "أتمنى لك يوماً سعيداً ولا تنس الاعتناء بصحتك!",
    "dashboard.learn_more": "اعرف المزيد",
    "dashboard.fitness_activity": "النشاط البدني",
    "dashboard.bike": "دراجة",
    "dashboard.run": "جري",
    "dashboard.walking": "مشي",
    "dashboard.yesterday": "أمس",
    "dashboard.hours_sleep": "ساعات النوم",
    "dashboard.reminders": "التذكيرات",
    "dashboard.stretching": "تمارين الإطالة",
    "dashboard.mind_training": "تدريب العقل",
    "dashboard.reports": "التقارير",
    "dashboard.weight_loss": "فقدان الوزن",
    "dashboard.decrease": "انخفاض",
    "dashboard.general_health": "الصحة العامة",
    "dashboard.increase": "زيادة",
    "dashboard.goals_achievement": "لقد حققت 86% من أهدافك هذا الشهر",

    // Health metrics
    "metrics.steps": "الخطوات المتخذة",
    "metrics.water": "الماء المتناول",
    "metrics.heart_rate": "معدل ضربات القلب",
    "metrics.calories": "السعرات المحروقة",
    "metrics.blood_sugar": "سكر الدم",
    "metrics.blood_pressure": "ضغط الدم",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
