import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image, { StaticImageData } from "next/image";
import men from '@/src/assets/home/SecFive.webp';

import {
    IconAward,
    IconSalad,
    IconClockHour4,
    IconUsers,
    IconBarbell,
    IconClipboardList,
} from "@tabler/icons-react";

interface FeatureItem {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string; stroke?: number }>;
}

const leftFeatures: FeatureItem[] = [
    {
        id: "proven-transformation",
        title: "تحول اثبات‌شده",
        description:
            "به صدها نفری بپیوندید که در اینجا به نتایج واقعی و ماندگار رسیده‌اند.",
        icon: IconAward,
    },
    {
        id: "nutrition-guidance",
        title: "تغذیه و راهنمایی",
        description:
            "نکات تخصصی درباره وعده‌های غذایی، ریکاوری و سلامتی کلی دریافت کنید.",
        icon: IconSalad,
    },
    {
        id: "location-time",
        title: "موقعیت و زمان مناسب",
        description:
            "در هر زمان با دسترسی آسان و ساعت‌های طولانی تمرین کنید.",
        icon: IconClockHour4,
    },
];

const rightFeatures: FeatureItem[] = [
    {
        id: "expert-coaches",
        title: "مربیان متخصص و مجرب",
        description:
            "با متخصصان معتمد تمرین کنید که به شما به طور موثر جهت می‌دهند.",
        icon: IconUsers,
    },
    {
        id: "advanced-equipment",
        title: "تجهیزات پیشرفته",
        description:
            "با پیشرفته‌ترین دستگاه‌ها برای گرفتن نتایج بهتر تمرین کنید.",
        icon: IconBarbell,
    },
    {
        id: "personal-plans",
        title: "برنامه‌های تناسب اندام شخصی",
        description:
            "برنامه‌ای متناسب با بدن، سبک زندگی و اهداف خود دریافت کنید.",
        icon: IconClipboardList,
    },
];

interface WhyChooseUsProps {
    /** آدرس تصویر ایلوستریتور وسط بخش */
    imageSrc?: string | StaticImageData;
    imageAlt?: string;
}

export function WhyChooseUs({
    imageSrc = men,
    imageAlt = "تصویر ایلوستریتور مربی بدنسازی",
}: WhyChooseUsProps) {
    return (
        <section
            aria-labelledby="why-choose-us-heading"
            className="w-full px-4  sm:px-6 lg:px-10  fp-glow"
        >
            <div className="mx-auto max-w-6xl mt-2">
                {/* هدر بخش */}
                <div className="mb-12 flex flex-col items-center text-center">
                    <Badge
                        variant="secondary"
                        className="hero-badge mb-4 rounded-full px-4 py-1 text-xs font-semibold"
                    >
                        چرا ما؟
                    </Badge>

                    <h2
                        id="why-choose-us-heading"
                        className="max-w-2xl text-3xl font-extrabold leading-snug tracking-tight fp-heading sm:text-4xl lg:text-[42px]"
                    >
                        چرا ما بهترین انتخاب{" "}
                        <span className="fp-accent-ink">برای شما هستیم؟</span>
                    </h2>
                </div>

                {/* گرید سه‌ستونه در دسکتاپ: ستون راست | تصویر وسط | ستون چپ */}
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
                    {/* ستون اول (در RTL سمت راست قرار می‌گیرد) */}
                    <div className="space-y-6 lg:col-span-4">
                        {rightFeatures.map((item) => (
                            <FeatureCard key={item.id} item={item} />
                        ))}
                    </div>

                    {/* تصویر وسط */}
                    <div className="flex items-center justify-center lg:col-span-4">
                        <div className="relative flex w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl p-2">
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                className="h-auto w-full object-contain select-none"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>

                    {/* ستون دوم (در RTL سمت چپ قرار می‌گیرد) */}
                    <div className="space-y-6 lg:col-span-4">
                        {leftFeatures.map((item) => (
                            <FeatureCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ item }: { item: FeatureItem }) {
    const IconComponent = item.icon;

    return (
        <Card className="border-none bg-transparent shadow-none">
            <CardContent className="flex items-start gap-4 p-1 text-right">
                {/* دایره زرد/لیمویی آیکون */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8DA68E] text-[#1D241B] shadow-xs">
                    <IconComponent className="h-5 w-5" stroke={2.2} />
                </div>

                {/* عنوان و توضیح */}
                <div className="space-y-1">
                    <h3 className="text-base font-bold fp-heading sm:text-lg">
                        {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed fp-muted sm:text-sm">
                        {item.description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default WhyChooseUs;