import React from "react";
import Image, { StaticImageData } from "next/image";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconCheck } from "@tabler/icons-react";
import { Marker, MarkerContent } from "@/components/ui/marker"

import men from '@/src/assets/home/mencoach.webp';
import miss from '@/src/assets/home/misscoach.webp';


export interface CoachItem {
  id: string;
  name: string;
  role: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
}

const defaultCoaches: CoachItem[] = [
  {
    id: "rayhan",
    name: "ریحان",
    role: "مربی تغذیه و تندرستی",
    imageSrc: miss,
    imageAlt: "تصویر مربی ریحان",
  },
  {
    id: "rabbi",
    name: "نیما",
    role: "متخصص تحول بدنی",
    imageSrc: men,
    imageAlt: "تصویر مربی ربی",
  },
  {
    id: "samiul",
    name: "میلاد",
    role: "مربی تمرینات فانکشنال",
    imageSrc: miss,
    imageAlt: "تصویر مربی سامیول",
  },
  {
    id: "maryam",
    name: "مریم",
    role: "مربی قدرت و آمادگی جسمانی",
    imageSrc: miss,
    imageAlt: "تصویر مربی مریم",
  },
];

const highlights: string[] = [
  "مربی شخصی دارای مدرک معتبر",
  "متخصص تغذیه ورزشی",
  "قهرمان و ورزشکار سابق رقابتی",
  "کمک به بیش از ۱۲۰۰ ورزشکار برای رسیدن به هدف",
];

interface DedicatedCoachesProps {
  coaches?: CoachItem[];
}

export function DedicatedCoaches({
  coaches = defaultCoaches,
}: DedicatedCoachesProps) {
  return (
    <section
      aria-labelledby="dedicated-coaches-heading"
      className="w-full px-4 py-14 sm:px-6 lg:px-10 fp-page fp-glow"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* پنل سبز تیره سمت راست در چیدمان RTL */}
          <Card className="hero-panel flex flex-col justify-between rounded-3xl p-7 text-right shadow-none lg:col-span-4 sm:p-8">
            <div>
              <Badge className="hero-badge mb-5 rounded-full px-3.5 py-1 text-xs font-bold">
                تیم ما
              </Badge>

              <h2
                id="dedicated-coaches-heading"
                className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
              >
                آشنایی با{" "}
                <span className="text-[var(--sage)]">مربیان اختصاصی</span>{" "}
                شما
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/85">
                با مربیگری شخصی‌سازی‌شده، تکنیک‌های به‌روز و پشتیبانی مستمر، به
                شما کمک می‌کنیم تا به اهداف تناسب اندامی که همیشه آرزویش را
                داشتید برسید.
              </p>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-white/90 ">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/20 text-sage">
                    <IconCheck className="h-3.5 w-3.5" stroke={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* گرید ۲×۲ کارت‌های مربیان در سمت چپ */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8 ">
            {coaches.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

function CoachCard({ coach }: { coach: CoachItem }) {
  return (
    <Card className="fp-card group relative h-72 overflow-hidden rounded-3xl p-0 shadow-2xl sm:h-80">
      <Image
        src={coach.imageSrc}
        alt={coach.imageAlt}
        fill
        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
      />

      {/* باکس زرد/لیمویی پایین کارت */}
      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-[#8DA68E] px-4 py-3 text-center shadow-xs">
        <h3 className="text-base font-extrabold text-[#172018] sm:text-lg">
          {coach.name}
        </h3>
        <p className="mt-0.5 text-xs font-medium text-[#374238]">
          {coach.role}
        </p>
      </div>
    </Card>
  );
}

export default DedicatedCoaches;