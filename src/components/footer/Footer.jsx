import { Suspense } from 'react'
import Link from "next/link";
import {
  IconBarbell,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandYoutube,
  IconBrandLinkedin,
  IconMail,
  IconPhone,
  IconMapPin,
  IconArrowUpLeft,
  IconSparkles,
  IconHeartbeat,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

async function getRenderedAt() {
  'use cache'
  return new Date().getFullYear();
}


export default async function Footer() {
  const date = await getRenderedAt();
  return (
    <footer
      dir="rtl"
      className="relative w-full overflow-hidden bg-linear-to-b from-[#1A3B2E] via-[#153126] to-[#0F241C] text-[#F4F6F0] border-t border-white/15"
    >
      {/* نورپردازی ملایم پس‌زمینه هماهنگ با هدر و هیرو */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-[#6E9481]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-[#D7CFC3]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* بخش بالایی: بنر شیشه‌ای عضویت یا شروع رایگان هماهنگ با نوار بالای صفحه */}
        <div className="mb-12 rounded-3xl border border-white/20 bg-gradient-to-l from-white/15 via-white/10 to-[#D6CEC2]/15 p-6 backdrop-blur-md sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFECE6] px-3.5 py-1 text-xs font-semibold text-[#163327]">
                <IconSparkles className="h-3.5 w-3.5" />
                اپلیکیشن تخصصی فیتنس
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                آماده شروع مسیر سلامتی و تناسب اندام در خانه هستید؟
              </h3>
              <p className="max-w-xl text-sm text-[#C6D5CD]">
                برنامه‌های اختصاصی بدنسازی، چربی‌سوزی و تمرینات شکم را دریافت کنید و هر هفته نکات تمرینی و تغذیه‌ای جدید بگیرید.
              </p>
            </div>
          </div>
        </div>

        {/* بخش میانی: ستون‌های اطلاعات و لینک‌ها */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* ستون معرفی برند */}
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center justify-between lg:justify-start lg:gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-[#EFECE6] backdrop-blur-sm">
                <IconBarbell className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-white">
                    فیت پرو
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-sans text-xs font-semibold tracking-wider text-[#D6CEC2]">
                    FitPro
                  </span>
                </div>
                <p className="text-xs text-[#A8BEB2]">همراه هوشمند تمرین در خانه</p>
              </div>
            </div>

            <p className="text-sm leading-7 text-[#C6D5CD]">
              فیت پرو با طراحی برنامه‌های تمرینی شخصی‌سازی‌شده، به شما کمک می‌کند بدون نیاز به تجهیزات پیچیده و در محیط خانه، قدم‌به‌قدم به اندام ایده‌آل و سلامتی پایدار برسید.
            </p>

            {/* شبکه‌های اجتماعی */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { icon: IconBrandInstagram, label: "اینستاگرام", href: "#" },
                { icon: IconBrandTelegram, label: "تلگرام", href: "#" },
                { icon: IconBrandYoutube, label: "یوتیوب", href: "#" },
                { icon: IconBrandLinkedin, label: "لینکدین", href: "#" },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={idx}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-10 w-10 rounded-full border border-white/15 bg-white/5 text-[#EFECE6] transition-colors hover:border-[#EFECE6]/40 hover:bg-[#EFECE6] hover:text-[#163327]"
                  >
                    <Link href={social.href} aria-label={social.label}>
                      <Icon className="h-5 w-5" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* ستون دسترسی سریع */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-sm font-bold text-white">دسترسی سریع</h4>
            <ul className="space-y-2.5 text-sm text-[#C6D5CD]">
              {[
                { title: "صفحه اصلی", href: "/" },
                { title: "دوره‌ها و برنامه‌ها", href: "/courses" },
                { title: "فیتنس در خانه", href: "/fitness" },
                { title: "محاسبه BMI و کالری", href: "/tools" },
                { title: "مجله سلامتی", href: "/blog" },
              ].map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8AB09D]" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون برنامه‌های تخصصی */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-sm font-bold text-white">برنامه‌های تخصصی</h4>
            <ul className="space-y-2.5 text-sm text-[#C6D5CD]">
              {[
                { title: "بدنسازی بدون تجهیزات", href: "/programs/bodyweight" },
                { title: "چربی‌سوزی سریع (HIIT)", href: "/programs/fat-burn" },
                { title: "تمرینات تخصصی شکم و پهلو", href: "/programs/abs" },
                { title: "اصلاح فرم بدن و انعطاف", href: "/programs/posture" },
                { title: "رژیم غذایی اختصاصی", href: "/programs/diet" },
              ].map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D6CEC2]" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون پشتیبانی و ارتباط */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-sm font-bold text-white">ارتباط و پشتیبانی</h4>
            <ul className="space-y-3 text-sm text-[#C6D5CD]">
              <li className="flex items-start gap-2.5">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-[#EFECE6]" />
                <span>support@fitpro.ir</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-[#EFECE6]" />
                <span dir="ltr">0903 744 1493</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EFECE6]" />
                <span>تهران، مرکز نوآوری سلامت و ورزش</span>
              </li>
            </ul>

            <div className="pt-2">
              <Button
                variant="outline"
                asChild
                className="w-full rounded-full border-white/25 bg-transparent text-xs font-medium text-[#EFECE6] hover:bg-white/10 hover:text-white"
              >
                <Link href="/programs">مشاهده برنامه‌ها</Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/15" />

        {/* نوار کپی‌رایت پایانی */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#A8BEB2] sm:flex-row">
          <p className="flex items-center gap-1.5">
            <span>©
              <Suspense >
                {date}
              </Suspense>
              {''} فیت پرو FitPro. طراحی شده توسط میلاد اسعدی.
            </span>
            <IconHeartbeat className="h-4 w-4 text-[#8AB09D]" />
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              قوانین و مقررات
            </Link>
            <Link href="/faq" className="transition-colors hover:text-white">
              سوالات متداول
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}