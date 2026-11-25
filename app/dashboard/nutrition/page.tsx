"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
    IconApple,
    IconBolt,
    IconBread,
    IconCheck,
    IconChevronLeft,
    IconClock,
    IconCoffee,
    IconDroplet,
    IconFlame,
    IconMeat,
    IconPill,
    IconSalad,
    IconScale,
    IconSoup,
    IconTarget,
} from "@tabler/icons-react";

type Macro = "protein" | "carb" | "fat";

type MealItem = {
    id: string;
    name: string;
    amount: string;
    calories: number;
};

type Meal = {
    id: string;
    title: string;
    time: string;
    calories: number;
    macro: Macro;
    items: MealItem[];
};

type DayPlan = {
    id: string;
    label: string;
    target: number;
    note: string;
    meals: Meal[];
};

const days: DayPlan[] = [
    {
        id: "sat",
        label: "شنبه",
        target: 1600,
        note: "روز تمرین پا — کربوهیدرات را قبل از تمرین مصرف کن.",
        meals: [
            {
                id: "sat-b",
                title: "صبحانه",
                time: "07:30",
                calories: 380,
                macro: "protein",
                items: [
                    { id: "s1", name: "املت سه‌تخم‌مرغ", amount: "۳ عدد", calories: 220 },
                    { id: "s2", name: "نان سنگک", amount: "۵۰ گرم", calories: 110 },
                    { id: "s3", name: "چای سبز بدون شکر", amount: "۱ لیوان", calories: 50 },
                ],
            },
            {
                id: "sat-s",
                title: "میان‌وعده",
                time: "10:30",
                calories: 220,
                macro: "carb",
                items: [
                    { id: "s4", name: "ماست یونانی", amount: "۱۵۰ گرم", calories: 120 },
                    { id: "s5", name: "گردو", amount: "۱۵ گرم", calories: 100 },
                ],
            },
            {
                id: "sat-l",
                title: "ناهار",
                time: "13:30",
                calories: 550,
                macro: "protein",
                items: [
                    { id: "s6", name: "سینه مرغ گریل", amount: "۱۵۰ گرم", calories: 250 },
                    { id: "s7", name: "برنج قهوه‌ای", amount: "۱ پیمانه", calories: 220 },
                    { id: "s8", name: "سالاد کلم و خیار", amount: "۱ کاسه", calories: 80 },
                ],
            },
            {
                id: "sat-d",
                title: "شام",
                time: "19:30",
                calories: 450,
                macro: "fat",
                items: [
                    { id: "s9", name: "ماهی سالمون", amount: "۱۲۰ گرم", calories: 280 },
                    { id: "s10", name: "سبزیجات بخارپز", amount: "۱ کاسه", calories: 90 },
                    { id: "s11", name: "روغن زیتون", amount: "۱ قاشق", calories: 80 },
                ],
            },
        ],
    },
    {
        id: "sun",
        label: "یکشنبه",
        target: 1550,
        note: "روز استراحت — پروتئین را بالا نگه دار، کربوهیدرات کمتر.",
        meals: [
            {
                id: "sun-b",
                title: "صبحانه",
                time: "08:00",
                calories: 320,
                macro: "protein",
                items: [
                    { id: "u1", name: "پنیر کم‌چرب و گردو", amount: "۴۰ گرم", calories: 180 },
                    { id: "u2", name: "نان جو", amount: "۲ کف دست", calories: 140 },
                ],
            },
            {
                id: "sun-s",
                title: "میان‌وعده",
                time: "11:00",
                calories: 180,
                macro: "carb",
                items: [
                    { id: "u3", name: "سیب و دارچین", amount: "۱ عدد", calories: 95 },
                    { id: "u4", name: "کره بادام‌زمینی", amount: "۱ قاشق", calories: 85 },
                ],
            },
            {
                id: "sun-l",
                title: "ناهار",
                time: "14:00",
                calories: 580,
                macro: "protein",
                items: [
                    { id: "u5", name: "عدس‌پلو", amount: "۱ پیمانه", calories: 380 },
                    { id: "u6", name: "ماست و خیار", amount: "۱ کاسه", calories: 120 },
                    { id: "u7", name: "سالاد فصل", amount: "۱ کاسه", calories: 80 },
                ],
            },
            {
                id: "sun-d",
                title: "شام",
                time: "20:00",
                calories: 470,
                macro: "fat",
                items: [
                    { id: "u8", name: "سوپ جو و قارچ", amount: "۱ کاسه", calories: 210 },
                    { id: "u9", name: "تخم‌مرغ آب‌پز", amount: "۲ عدد", calories: 150 },
                    { id: "u10", name: "آووکادو", amount: "نصف", calories: 110 },
                ],
            },
        ],
    },
    {
        id: "mon",
        label: "دوشنبه",
        target: 1700,
        note: "روز حجم — یک وعده اضافه بعد از تمرین مجاز است.",
        meals: [
            {
                id: "mon-b",
                title: "صبحانه",
                time: "07:15",
                calories: 420,
                macro: "protein",
                items: [
                    { id: "m1", name: "شیک پروتئین و موز", amount: "۱ لیوان", calories: 290 },
                    { id: "m2", name: "جو دوسر", amount: "۴۰ گرم", calories: 130 },
                ],
            },
            {
                id: "mon-s",
                title: "میان‌وعده",
                time: "10:45",
                calories: 240,
                macro: "carb",
                items: [
                    { id: "m3", name: "خرما و چای", amount: "۳ عدد", calories: 160 },
                    { id: "m4", name: "بادام", amount: "۱۰ عدد", calories: 80 },
                ],
            },
            {
                id: "mon-l",
                title: "ناهار",
                time: "13:45",
                calories: 620,
                macro: "protein",
                items: [
                    { id: "m5", name: "گوشت ران گوساله", amount: "۱۴۰ گرم", calories: 320 },
                    { id: "m6", name: "سیب‌زمینی پخته", amount: "۱ عدد", calories: 210 },
                    { id: "m7", name: "سبزی خوردن", amount: "۱ کاسه", calories: 90 },
                ],
            },
            {
                id: "mon-d",
                title: "شام",
                time: "20:30",
                calories: 420,
                macro: "fat",
                items: [
                    { id: "m8", name: "نیمرو با تخم‌مرغ محلی", amount: "۲ عدد", calories: 190 },
                    { id: "m9", name: "کدو حلوایی پخته", amount: "۱۵۰ گرم", calories: 120 },
                    { id: "m10", name: "کنجد", amount: "۱ قاشق", calories: 110 },
                ],
            },
        ],
    },
];

const macroMeta: Record<Macro, { label: string; icon: ReactNode; percent: number }> = {
    protein: { label: "پروتئین", icon: <IconMeat size={18} stroke={1.8} />, percent: 38 },
    carb: { label: "کربوهیدرات", icon: <IconBread size={18} stroke={1.8} />, percent: 40 },
    fat: { label: "چربی", icon: <IconSalad size={18} stroke={1.8} />, percent: 22 },
};

const weekOverview = [
    { label: "شنبه", kcal: "۱۶۰۰", filled: true },
    { label: "یکشنبه", kcal: "۱۵۵۰", filled: true },
    { label: "دوشنبه", kcal: "۱۷۰۰", filled: true },
    { label: "سه‌شنبه", kcal: "۱۶۰۰", filled: false },
    { label: "چهارشنبه", kcal: "۱۶۵۰", filled: false },
    { label: "پنجشنبه", kcal: "۱۵۰۰", filled: false },
    { label: "جمعه", kcal: "آزاد", filled: false },
];

const toFa = (value: number) =>
    value.toLocaleString("fa-IR", { maximumFractionDigits: 0 });

export default function NutritionPage() {
    const [activeId, setActiveId] = useState(days[0].id);
    const day = days.find((item) => item.id === activeId) ?? days[0];

    const [checked, setChecked] = useState<Record<string, boolean>>({
        s1: true,
        s2: true,
        s4: true,
        s6: true,
    });

    const [water, setWater] = useState(5);

    const consumed = day.meals.reduce(
        (sum, meal) =>
            sum +
            meal.items
                .filter((item) => checked[item.id])
                .reduce((inner, item) => inner + item.calories, 0),
        0
    );

    const progress = Math.min(100, Math.round((consumed / day.target) * 100));

    const mealDone = (meal: Meal) =>
        meal.items.every((item) => checked[item.id]);

    const toggle = (id: string) =>
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

    const toggleMeal = (meal: Meal) => {
        const allDone = mealDone(meal);
        setChecked((prev) => {
            const next = { ...prev };
            meal.items.forEach((item) => {
                next[item.id] = !allDone;
            });
            return next;
        });
    };

    const totalMealsDone = useMemo(
        () => day.meals.filter((meal) => meal.items.every((item) => checked[item.id])).length,
        [day, checked]
    );

    return (
        <>
            {/* عنوان صفحه */}
            <section className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 className="dash-heading text-xl md:text-2xl font-extrabold">
                        تغذیه و رژیم
                    </h2>
                    <p className="dash-muted text-xs md:text-sm mt-1.5">
                        برنامه غذایی روزانه، وعده‌ها، درشت‌مغذی‌ها و مصرف آب
                    </p>
                </div>
                <div className="dash-chip flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold">
                    <IconTarget size={18} stroke={1.8} />
                    <span>رژیم کات — هدف {toFa(day.target)} کالری</span>
                </div>
            </section>

            {/* خلاصه امروز */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="hero-panel fp-glow rounded-2xl p-5 md:p-6 lg:col-span-2 flex flex-col justify-between gap-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold">
                                <IconFlame size={14} stroke={1.8} />
                                کالری امروز
                            </span>
                            <h3 className="mt-3 text-lg md:text-xl font-extrabold">
                                {toFa(consumed)} از {toFa(day.target)} کالری
                            </h3>
                            <p className="mt-1.5 text-xs leading-relaxed opacity-75">
                                مربی تغذیه: سارا احمدی — {day.note}
                            </p>
                        </div>
                        <div className="dash-chip rounded-xl px-3 py-2 text-center shrink-0">
                            <p className="text-lg font-extrabold leading-none">{toFa(progress)}٪</p>
                            <p className="mt-1 text-[10px] opacity-70">از هدف روز</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between text-[11px] opacity-75 mb-2">
                            <span>{toFa(totalMealsDone)} وعده کامل از {toFa(day.meals.length)} وعده</span>
                            <span>{toFa(Math.max(0, day.target - consumed))} کالری باقی‌مانده</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
                            <div
                                className="h-full rounded-full bg-[var(--hero-accent)] transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button className="btn-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold">
                            <IconSoup size={16} stroke={2} />
                            ثبت وعده جدید
                        </button>
                        <button className="rounded-xl border border-white/25 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-white/10">
                            دریافت رژیم PDF
                        </button>
                    </div>
                </div>

                {/* درشت‌مغذی‌ها و آب */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="dash-card rounded-2xl p-4">
                        <p className="dash-muted text-[11px]">درشت‌مغذی‌های امروز</p>
                        <div className="mt-3 space-y-2.5">
                            {(Object.keys(macroMeta) as Macro[]).map((key) => (
                                <div key={key}>
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="dash-heading flex items-center gap-1.5 font-bold">
                                            {macroMeta[key].icon}
                                            {macroMeta[key].label}
                                        </span>
                                        <span className="dash-muted">{toFa(macroMeta[key].percent)}٪</span>
                                    </div>
                                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--dash-chip-bg)]">
                                        <div
                                            className="h-full rounded-full bg-[var(--hero-accent)]"
                                            style={{ width: `${macroMeta[key].percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="dash-card rounded-2xl p-4">
                        <div className="flex items-center justify-between">
                            <p className="dash-muted text-[11px]">مصرف آب</p>
                            <span className="dash-heading text-xs font-extrabold">
                                {toFa(water)} از ۸ لیوان
                            </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {Array.from({ length: 8 }).map((_, index) => {
                                const filled = index < water;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setWater(index + 1 === water ? index : index + 1)}
                                        aria-label={`لیوان ${index + 1}`}
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${filled
                                            ? "border-[var(--hero-accent)] bg-[var(--hero-accent)] text-[var(--hero-accent-ink)]"
                                            : "border-[var(--dash-line)] dash-chip"
                                            }`}
                                    >
                                        <IconDroplet size={15} stroke={2} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* انتخاب روز */}
            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="dash-heading text-base font-bold">برنامه روز</h3>
                    <span className="dash-muted text-xs">روی هر روز بزن</span>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {days.map((item) => {
                        const isActive = item.id === activeId;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveId(item.id)}
                                className={`dash-card rounded-xl p-2.5 text-center transition-transform duration-200 border-[var(--dash-line)] ${isActive
                                    ? "-translate-y-1 border-[var(--hero-accent)] ring-2 ring-[var(--hero-accent)]"
                                    : "hover:-translate-y-0.5"
                                    }`}
                            >
                                <p className="dash-muted text-[11px]">{item.label}</p>
                                <p className="dash-heading mt-1 text-sm font-extrabold">
                                    {toFa(item.target)}
                                </p>
                                <p className="dash-muted text-[10px]">کالری</p>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* وعده‌های غذایی */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="dash-card rounded-2xl p-5 lg:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--dash-line)] pb-4">
                        <div>
                            <h3 className="dash-heading text-base font-bold">
                                وعده‌های {day.label}
                            </h3>
                            <p className="dash-muted mt-1.5 flex flex-wrap items-center gap-3 text-[11px]">
                                <span className="flex items-center gap-1">
                                    <IconClock size={14} stroke={1.8} />
                                    ۴ وعده اصلی
                                </span>
                                <span className="flex items-center gap-1">
                                    <IconFlame size={14} stroke={1.8} />
                                    {toFa(consumed)} کالری ثبت‌شده
                                </span>
                            </p>
                        </div>
                        <div className="dash-chip rounded-xl px-3 py-2 text-center">
                            <p className="text-sm font-extrabold leading-none">
                                {toFa(totalMealsDone)}/{toFa(day.meals.length)}
                            </p>
                            <p className="mt-1 text-[10px] opacity-70">وعده</p>
                        </div>
                    </div>

                    <div className="mt-2 divide-y divide-[var(--dash-line)]">
                        {day.meals.map((meal) => {
                            const done = mealDone(meal);
                            return (
                                <div key={meal.id} className="py-3">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleMeal(meal)}
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${done
                                                ? "border-[var(--hero-accent)] bg-[var(--hero-accent)] text-[var(--hero-accent-ink)]"
                                                : "border-[var(--dash-line)] dash-chip"
                                                }`}
                                            aria-label={`تکمیل ${meal.title}`}
                                        >
                                            {done ? (
                                                <IconCheck size={15} stroke={2.6} />
                                            ) : (
                                                <IconCoffee size={15} stroke={1.8} />
                                            )}
                                        </button>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p
                                                    className={`dash-heading text-sm font-bold ${done ? "line-through opacity-60" : ""}`}
                                                >
                                                    {meal.title}
                                                </p>
                                                <span className="dash-muted text-[10px]">{meal.time}</span>
                                            </div>
                                            <p className="dash-muted mt-0.5 text-[11px]">
                                                {macroMeta[meal.macro].label} · {toFa(meal.calories)} کالری
                                            </p>
                                        </div>
                                        <span className="dash-chip rounded-lg px-2.5 py-1 text-[11px] font-bold">
                                            {toFa(meal.items.length)} آیتم
                                        </span>
                                    </div>

                                    <ul className="mt-2 space-y-1.5 pr-11">
                                        {meal.items.map((item) => {
                                            const isDone = !!checked[item.id];
                                            return (
                                                <li key={item.id}>
                                                    <button
                                                        onClick={() => toggle(item.id)}
                                                        className="flex w-full items-center justify-between gap-3 text-right"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <span
                                                                className={`flex h-4 w-4 items-center justify-center rounded border ${isDone
                                                                    ? "border-[var(--hero-accent)] bg-[var(--hero-accent)] text-[var(--hero-accent-ink)]"
                                                                    : "border-[var(--dash-line)]"
                                                                    }`}
                                                            >
                                                                {isDone && <IconCheck size={11} stroke={3} />}
                                                            </span>
                                                            <span
                                                                className={`text-xs ${isDone ? "dash-muted line-through" : "dash-heading"}`}
                                                            >
                                                                {item.name}
                                                            </span>
                                                            <span className="dash-muted text-[10px]">
                                                                {item.amount}
                                                            </span>
                                                        </span>
                                                        <span className="dash-muted text-[10px]">
                                                            {toFa(item.calories)} kcal
                                                        </span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-[var(--dash-line)] pt-4">
                        <span className="dash-muted text-[11px]">
                            {toFa(totalMealsDone)} از {toFa(day.meals.length)} وعده کامل شد
                        </span>
                        <button className="btn-primary rounded-xl px-4 py-2 text-xs font-bold">
                            پایان روز
                        </button>
                    </div>
                </div>

                {/* ستون کناری */}
                <div className="space-y-4">
                    <div className="dash-card rounded-2xl p-5">
                        <h4 className="dash-heading flex items-center gap-2 text-sm font-bold">
                            <IconApple size={18} stroke={1.8} />
                            یادداشت مربی تغذیه
                        </h4>
                        <p className="dash-muted mt-2 text-xs leading-relaxed">
                            شام را حداکثر تا دو ساعت قبل از خواب بخور و بعد از تمرین
                            حتماً ۲۵ گرم پروتئین سریع‌جذب مصرف کن. نمک را کم نگه
                            دار تا ورم نداشته باشی.
                        </p>
                        <p className="dash-muted mt-3 text-[11px] opacity-70">
                            آخرین به‌روزرسانی: دیروز
                        </p>
                    </div>

                    <div className="dash-card rounded-2xl p-5">
                        <h4 className="dash-heading flex items-center gap-2 text-sm font-bold">
                            <IconPill size={18} stroke={1.8} />
                            مکمل‌های امروز
                        </h4>
                        <ul className="dash-muted mt-3 space-y-2 text-xs">
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--hero-accent)]" />
                                مولتی‌ویتامین — همراه صبحانه
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--hero-accent)]" />
                                ویتامین D — نیم‌ساعت بعد ناهار
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--hero-accent)]" />
                                پروتئین وی — پس از تمرین
                            </li>
                        </ul>
                    </div>

                    <div className="dash-card rounded-2xl p-5">
                        <h4 className="dash-heading flex items-center gap-2 text-sm font-bold">
                            <IconScale size={18} stroke={1.8} />
                            وزن و شاخص‌ها
                        </h4>
                        <div className="mt-3 flex items-end justify-between">
                            <div>
                                <p className="dash-heading text-lg font-extrabold">۷۸.۴</p>
                                <p className="dash-muted text-[10px]">کیلوگرم — امروز</p>
                            </div>
                            <div className="dash-chip flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold">
                                <IconBolt size={13} stroke={2} />
                                ۰.۶− نسبت به هفته قبل
                            </div>
                        </div>
                        <button className="dash-control mt-4 w-full rounded-xl px-4 py-2 text-xs font-bold">
                            ثبت وزن جدید
                        </button>
                    </div>
                </div>
            </section>

            {/* نمای هفته */}
            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="dash-heading text-base font-bold">نمای هفته</h3>
                    <span className="dash-muted text-xs">۷ روز</span>
                </div>
                <div className="dash-card overflow-hidden rounded-2xl">
                    {weekOverview.map((item, index) => (
                        <div
                            key={item.label}
                            className={`flex items-center justify-between gap-3 p-4 ${index !== weekOverview.length - 1
                                ? "border-b border-[var(--dash-line)]"
                                : ""
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="dash-chip flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold">
                                    {toFa(index + 1)}
                                </span>
                                <p className="dash-heading text-sm font-bold">{item.label}</p>
                            </div>
                            <div className="flex items-center gap-2 text-[11px]">
                                <span className="dash-muted">{item.kcal} کالری هدف</span>
                                {item.filled ? (
                                    <span className="flex items-center gap-1 rounded-lg bg-[var(--hero-accent)] px-2.5 py-1 font-bold text-[var(--hero-accent-ink)]">
                                        <IconCheck size={12} stroke={2.6} />
                                        ثبت شد
                                    </span>
                                ) : (
                                    <button className="dash-chip flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold">
                                        مشاهده
                                        <IconChevronLeft size={12} stroke={2} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
