"use client";

import { useMemo, useState } from "react";
import {
    IconBarbell,
    IconCalendarEvent,
    IconCheck,
    IconChevronLeft,
    IconClock,
    IconDroplet,
    IconFlame,
    IconPlayerPlay,
    IconRepeat,
    IconRun,
    IconTrophy,
} from "@tabler/icons-react";

type Exercise = {
    id: string;
    name: string;
    sets: string;
    rest: string;
};

type DayPlan = {
    id: string;
    label: string;
    focus: string;
    duration: string;
    calories: string;
    state: "done" | "today" | "rest" | "upcoming";
    exercises: Exercise[];
};

const week: DayPlan[] = [
    {
        id: "sat",
        label: "شنبه",
        focus: "پا و باسن",
        duration: "۵۰ دقیقه",
        calories: "۴۲۰ کالری",
        state: "done",
        exercises: [
            { id: "sat-1", name: "اسکوات با هالتر", sets: "۴ × ۱۰", rest: "۹۰ ثانیه" },
            { id: "sat-2", name: "پرس پا دستگاه", sets: "۳ × ۱۲", rest: "۶۰ ثانیه" },
            { id: "sat-3", name: "دمبل لانژ", sets: "۳ × ۱۲", rest: "۶۰ ثانیه" },
            { id: "sat-4", name: "ساق ایستاده", sets: "۴ × ۱۵", rest: "۴۵ ثانیه" },
        ],
    },
    {
        id: "sun",
        label: "یکشنبه",
        focus: "استراحت فعال",
        duration: "۲۰ دقیقه",
        calories: "۱۲۰ کالری",
        state: "rest",
        exercises: [
            { id: "sun-1", name: "پیاده‌روی سبک", sets: "۲۰ دقیقه", rest: "—" },
            { id: "sun-2", name: "حرکات کششی کل بدن", sets: "۱۰ دقیقه", rest: "—" },
        ],
    },
    {
        id: "mon",
        label: "دوشنبه",
        focus: "زیربغل و جلو بازو",
        duration: "۴۵ دقیقه",
        calories: "۳۸۰ کالری",
        state: "done",
        exercises: [
            { id: "mon-1", name: "زیربغل سیم‌کش", sets: "۴ × ۱۲", rest: "۹۰ ثانیه" },
            { id: "mon-2", name: "قایقی دستگاه", sets: "۳ × ۱۲", rest: "۶۰ ثانیه" },
            { id: "mon-3", name: "جلو بازو دمبل", sets: "۳ × ۱۵", rest: "۴۵ ثانیه" },
        ],
    },
    {
        id: "tue",
        label: "سه‌شنبه",
        focus: "هوازی و شکم",
        duration: "۴۰ دقیقه",
        calories: "۴۵۰ کالری",
        state: "today",
        exercises: [
            { id: "tue-1", name: "تردمیل (شیب ۵٪)", sets: "۱۵ دقیقه", rest: "—" },
            { id: "tue-2", name: "پلانک", sets: "۳ × ۴۵ ثانیه", rest: "۳۰ ثانیه" },
            { id: "tue-3", name: "کرانچ کابل", sets: "۳ × ۱۵", rest: "۴۵ ثانیه" },
            { id: "tue-4", name: "بالا آوردن پا از آویز", sets: "۳ × ۱۲", rest: "۴۵ ثانیه" },
        ],
    },
    {
        id: "wed",
        label: "چهارشنبه",
        focus: "سینه و سرشانه",
        duration: "۵۰ دقیقه",
        calories: "۴۰۰ کالری",
        state: "upcoming",
        exercises: [
            { id: "wed-1", name: "پرس سینه دمبل", sets: "۴ × ۱۰", rest: "۹۰ ثانیه" },
            { id: "wed-2", name: "پرس بالا سینه", sets: "۳ × ۱۲", rest: "۶۰ ثانیه" },
            { id: "wed-3", name: "سرشانه دمبل", sets: "۳ × ۱۲", rest: "۶۰ ثانیه" },
            { id: "wed-4", name: "نشر از جانب", sets: "۳ × ۱۵", rest: "۴۵ ثانیه" },
        ],
    },
    {
        id: "thu",
        label: "پنجشنبه",
        focus: "کشش و تحرک",
        duration: "۳۰ دقیقه",
        calories: "۲۲۰ کالری",
        state: "upcoming",
        exercises: [
            { id: "thu-1", name: "یوگا و تحرک مفاصل", sets: "۲۰ دقیقه", rest: "—" },
            { id: "thu-2", name: "فوم رولینگ", sets: "۱۰ دقیقه", rest: "—" },
        ],
    },
    {
        id: "fri",
        label: "جمعه",
        focus: "استراحت کامل",
        duration: "—",
        calories: "—",
        state: "rest",
        exercises: [],
    },
];

const archive = [
    {
        id: "a1",
        title: "برنامه ۴ هفته‌ای چربی‌سوزی",
        coach: "مربی: سارا احمدی",
        period: "۱۴۰۵/۰۵/۰۱ تا ۱۴۰۵/۰۵/۳۰",
        adherence: "۹۲٪ پایبندی",
        result: "۳.۲ کیلوگرم کاهش وزن",
    },
    {
        id: "a2",
        title: "برنامه ۸ هفته‌ای حجم",
        coach: "مربی: رضا کریمی",
        period: "۱۴۰۵/۰۱/۱۵ تا ۱۴۰۵/۰۳/۱۵",
        adherence: "۸۴٪ پایبندی",
        result: "۲.۵ کیلوگرم افزایش عضله",
    },
];

const stateStyles: Record<DayPlan["state"], string> = {
    done: "border-[var(--hero-accent)] bg-[var(--dash-chip-bg)]",
    today: "border-[var(--hero-accent)] ring-2 ring-[var(--hero-accent)]",
    rest: "border-[var(--dash-line)] bg-transparent",
    upcoming: "border-[var(--dash-line)]",
};

export default function WorkoutsPage() {
    const todayIndex = week.findIndex((day) => day.state === "today");
    const [activeId, setActiveId] = useState(week[todayIndex]?.id ?? week[0].id);
    const active = week.find((day) => day.id === activeId) ?? week[0];

    const [done, setDone] = useState<Record<string, boolean>>({
        "sat-1": true,
        "sat-2": true,
        "sat-3": true,
        "mon-1": true,
        "mon-2": true,
    });

    const doneCount = active.exercises.filter((item) => done[item.id]).length;
    const progress = active.exercises.length
        ? Math.round((doneCount / active.exercises.length) * 100)
        : 0;

    const weekDone = useMemo(
        () => week.filter((day) => day.state === "done").length,
        []
    );

    const toggle = (id: string) =>
        setDone((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <>
            {/* عنوان صفحه */}
            <section className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 className="dash-heading text-xl md:text-2xl font-extrabold">
                        برنامه‌های من
                    </h2>
                    <p className="dash-muted text-xs md:text-sm mt-1.5">
                        برنامه تمرینی فعلی، جلسات هفته و سابقه دوره‌های قبلی
                    </p>
                </div>
                <div className="dash-chip flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold">
                    <IconCalendarEvent size={18} stroke={1.8} />
                    <span>هفته ۲ از ۶ برنامه</span>
                </div>
            </section>

            {/* برنامه فعال */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="hero-panel fp-glow rounded-2xl p-5 md:p-6 lg:col-span-2 flex flex-col justify-between gap-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold">
                                <IconTrophy size={14} stroke={1.8} />
                                برنامه فعال
                            </span>
                            <h3 className="mt-3 text-lg md:text-xl font-extrabold">
                                دوره ۶ هفته‌ای تناسب اندام
                            </h3>
                            <p className="mt-1.5 text-xs leading-relaxed opacity-75">
                                مربی: رضا کریمی — هدف: کاهش چربی و افزایش استقامت
                            </p>
                        </div>
                        <div className="dash-chip rounded-xl px-3 py-2 text-center shrink-0">
                            <p className="text-lg font-extrabold leading-none">۶۵٪</p>
                            <p className="mt-1 text-[10px] opacity-70">پیشرفت کل</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between text-[11px] opacity-75 mb-2">
                            <span>۱۲ جلسه انجام‌شده از ۱۸ جلسه</span>
                            <span>۷ روز باقی‌مانده تا پایان هفته</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
                            <div
                                className="h-full rounded-full bg-[var(--hero-accent)] transition-all duration-300"
                                style={{ width: "65%" }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button className="btn-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold">
                            <IconPlayerPlay size={16} stroke={2} />
                            شروع تمرین امروز
                        </button>
                        <button className="rounded-xl border border-white/25 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-white/10">
                            دریافت برنامه PDF
                        </button>
                    </div>
                </div>

                {/* آمار هفته */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="dash-card rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="dash-muted text-[11px]">جلسات این هفته</p>
                            <p className="dash-heading mt-1 text-lg font-extrabold">
                                {weekDone} از ۵
                            </p>
                        </div>
                        <div className="dash-chip flex h-11 w-11 items-center justify-center rounded-full shrink-0">
                            <IconRun size={22} stroke={1.8} />
                        </div>
                    </div>
                    <div className="dash-card rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="dash-muted text-[11px]">کالری سوزانده‌شده</p>
                            <p className="dash-heading mt-1 text-lg font-extrabold">۱٬۲۵۰</p>
                        </div>
                        <div className="dash-chip flex h-11 w-11 items-center justify-center rounded-full shrink-0">
                            <IconFlame size={22} stroke={1.8} />
                        </div>
                    </div>
                </div>
            </section>

            {/* تایم‌لاین هفته */}
            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="dash-heading text-base font-bold">هفته جاری</h3>
                    <span className="dash-muted text-xs">روی هر روز بزن</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 md:gap-3">
                    {week.map((day) => {
                        const isActive = day.id === activeId;
                        return (
                            <button
                                key={day.id}
                                onClick={() => setActiveId(day.id)}
                                className={`dash-card rounded-xl p-2.5 md:p-3 text-center transition-transform duration-200 ${stateStyles[day.state]} ${isActive ? "-translate-y-1" : "hover:-translate-y-0.5"
                                    }`}
                            >
                                <p className="dash-muted text-[11px]">{day.label}</p>
                                <div className="my-2 flex justify-center">
                                    {day.state === "done" ? (
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--hero-accent)] text-[var(--hero-accent-ink)]">
                                            <IconCheck size={15} stroke={2.6} />
                                        </span>
                                    ) : day.state === "today" ? (
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full dash-chip">
                                            <IconBarbell size={15} stroke={2} />
                                        </span>
                                    ) : (
                                        <span className="h-7 w-7 rounded-full border border-dashed border-[var(--dash-line)]" />
                                    )}
                                </div>
                                <p className="dash-heading text-[10px] md:text-[11px] font-bold leading-tight">
                                    {day.focus}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* جزئیات روز انتخاب‌شده */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="dash-card rounded-2xl p-5 lg:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--dash-line)] pb-4">
                        <div>
                            <h3 className="dash-heading text-base font-bold">
                                {active.label} — {active.focus}
                            </h3>
                            <div className="dash-muted mt-1.5 flex flex-wrap items-center gap-3 text-[11px]">
                                <span className="flex items-center gap-1">
                                    <IconClock size={14} stroke={1.8} />
                                    {active.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <IconFlame size={14} stroke={1.8} />
                                    {active.calories}
                                </span>
                                <span className="flex items-center gap-1">
                                    <IconRepeat size={14} stroke={1.8} />
                                    {active.exercises.length} حرکت
                                </span>
                            </div>
                        </div>
                        <div className="dash-chip rounded-xl px-3 py-2 text-center">
                            <p className="text-sm font-extrabold leading-none">{progress}٪</p>
                            <p className="mt-1 text-[10px] opacity-70">تکمیل</p>
                        </div>
                    </div>

                    {active.exercises.length ? (
                        <ul className="mt-2 divide-y divide-[var(--dash-line)]">
                            {active.exercises.map((exercise, index) => {
                                const isDone = !!done[exercise.id];
                                return (
                                    <li key={exercise.id}>
                                        <button
                                            onClick={() => toggle(exercise.id)}
                                            className="flex w-full items-center gap-3 py-3 text-right"
                                        >
                                            <span
                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-bold ${isDone
                                                    ? "border-[var(--hero-accent)] bg-[var(--hero-accent)] text-[var(--hero-accent-ink)]"
                                                    : "border-[var(--dash-line)] dash-chip"
                                                    }`}
                                            >
                                                {isDone ? <IconCheck size={15} stroke={2.6} /> : index + 1}
                                            </span>
                                            <span className="flex-1">
                                                <span
                                                    className={`dash-heading block text-sm font-bold ${isDone ? "line-through opacity-60" : ""
                                                        }`}
                                                >
                                                    {exercise.name}
                                                </span>
                                                <span className="dash-muted mt-0.5 block text-[11px]">
                                                    {exercise.sets} · استراحت {exercise.rest}
                                                </span>
                                            </span>
                                            <IconChevronLeft
                                                size={18}
                                                stroke={1.6}
                                                className="dash-muted shrink-0"
                                            />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                            <IconTrophy size={28} stroke={1.5} className="dash-muted" />
                            <p className="dash-heading text-sm font-bold">روز استراحت</p>
                            <p className="dash-muted text-xs">
                                ریکاوری بخشی از برنامه است؛ امروز تمرین سنگین نداری.
                            </p>
                        </div>
                    )}

                    {active.exercises.length > 0 && (
                        <div className="mt-4 flex items-center justify-between border-t border-[var(--dash-line)] pt-4">
                            <span className="dash-muted text-[11px]">
                                {doneCount} از {active.exercises.length} حرکت انجام شد
                            </span>
                            <button className="btn-primary rounded-xl px-4 py-2 text-xs font-bold">
                                پایان جلسه
                            </button>
                        </div>
                    )}
                </div>

                {/* یادداشت مربی و مکمل */}
                <div className="space-y-4">
                    <div className="dash-card rounded-2xl p-5">
                        <h4 className="dash-heading text-sm font-bold">یادداشت مربی</h4>
                        <p className="dash-muted mt-2 text-xs leading-relaxed">
                            فرم پرس سینه را با آرنج کمی بسته‌تر اجرا کن و بین ست‌ها
                            نفس عمیق بگیر. اگر درد شانه داشتی، دمبل را با سیم‌کش
                            عوض کن.
                        </p>
                        <p className="dash-muted mt-3 text-[11px] opacity-70">
                            آخرین به‌روزرسانی: ۳ روز پیش
                        </p>
                    </div>

                    <div className="dash-card rounded-2xl p-5">
                        <h4 className="dash-heading flex items-center gap-2 text-sm font-bold">
                            <IconDroplet size={18} stroke={1.8} />
                            یادآور امروز
                        </h4>
                        <ul className="dash-muted mt-3 space-y-2 text-xs">
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--hero-accent)]" />
                                ۲ لیتر آب تا پایان روز
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--hero-accent)]" />
                                ۱۰ دقیقه کشش پس از تمرین
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--hero-accent)]" />
                                ثبت وزن هفتگی تا جمعه
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* آرشیو برنامه‌ها */}
            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="dash-heading text-base font-bold">برنامه‌های قبلی</h3>
                    <span className="dash-muted text-xs">۲ دوره</span>
                </div>
                <div className="dash-card overflow-hidden rounded-2xl">
                    {archive.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex flex-wrap items-center justify-between gap-3 p-4 md:p-5 ${index !== archive.length - 1
                                ? "border-b border-[var(--dash-line)]"
                                : ""
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="dash-chip flex h-10 w-10 items-center justify-center rounded-xl shrink-0">
                                    <IconBarbell size={20} stroke={1.8} />
                                </span>
                                <div>
                                    <p className="dash-heading text-sm font-bold">{item.title}</p>
                                    <p className="dash-muted mt-0.5 text-[11px]">
                                        {item.coach} · {item.period}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-[11px]">
                                <span className="dash-chip rounded-lg px-2.5 py-1 font-bold">
                                    {item.adherence}
                                </span>
                                <span className="rounded-lg border border-[var(--dash-line)] px-2.5 py-1">
                                    {item.result}
                                </span>
                                <button className="dash-control rounded-lg px-3 py-1.5 font-bold">
                                    جزئیات
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
