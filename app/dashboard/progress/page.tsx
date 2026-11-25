"use client";

import { useMemo, useState } from "react";
import {
    IconBarbell,
    IconBolt,
    IconCalendarEvent,
    IconCheck,
    IconClock,
    IconFlame,
    IconScale,
    IconTarget,
    IconTrophy,
} from "@tabler/icons-react";

type MetricKey = "weight" | "waist" | "fat";

type Metric = {
    key: MetricKey;
    label: string;
    unit: string;
    digits: number;
    start: number;
    goal: number;
    values: number[];
};

const metrics: Metric[] = [
    {
        key: "weight",
        label: "وزن",
        unit: "کیلوگرم",
        digits: 1,
        start: 82,
        goal: 76,
        values: [82, 81.4, 80.8, 80, 79.2, 78.4],
    },
    {
        key: "waist",
        label: "دور کمر",
        unit: "سانتی‌متر",
        digits: 0,
        start: 96,
        goal: 88,
        values: [96, 95, 94.2, 93.2, 92.2, 91],
    },
    {
        key: "fat",
        label: "درصد چربی",
        unit: "درصد",
        digits: 1,
        start: 28.4,
        goal: 22,
        values: [28.4, 27.9, 27.1, 26.4, 25.6, 24.8],
    },
];

const ranges = [
    { id: "4w", label: "۴ هفته", count: 4 },
    { id: "6w", label: "۶ هفته", count: 6 },
] as const;

type RangeId = (typeof ranges)[number]["id"];

const bodyRows = [
    { id: "b1", label: "دور کمر", start: 96, current: 91, unit: "سانتی‌متر" },
    { id: "b2", label: "دور سینه", start: 104, current: 102.5, unit: "سانتی‌متر" },
    { id: "b3", label: "دور بازو", start: 33.5, current: 34.2, unit: "سانتی‌متر" },
    { id: "b4", label: "دور ران", start: 59, current: 57.4, unit: "سانتی‌متر" },
    { id: "b5", label: "دور باسن", start: 102, current: 99.5, unit: "سانتی‌متر" },
];

const records = [
    { id: "r1", move: "پرس سینه هالتر", value: "۸۲.۵ کیلوگرم", date: "۱۴۰۵/۰۶/۰۳", delta: "۲.۵+" },
    { id: "r2", move: "اسکوات هالتر", value: "۱۲۰ کیلوگرم", date: "۱۴۰۵/۰۵/۲۹", delta: "۵+" },
    { id: "r3", move: "ددلیفت", value: "۱۴۵ کیلوگرم", date: "۱۴۰۵/۰۵/۲۲", delta: "۷.۵+" },
    { id: "r4", move: "بارفیکس", value: "۱۲ تکرار", date: "۱۴۰۵/۰۶/۰۱", delta: "۲+" },
];

const reports = [
    {
        id: "w1",
        week: "هفته ۶ — این هفته",
        date: "۱۴۰۵/۰۶/۰۶",
        weight: "۷۸.۴ کیلوگرم",
        adherence: "۹۲٪ پایبندی",
        note: "هر ۵ جلسه تمرین کامل شد؛ کالری روزانه به‌طور میانگین ۱٬۶۲۰ ثبت شد.",
        state: "today" as const,
    },
    {
        id: "w2",
        week: "هفته ۵",
        date: "۱۴۰۵/۰۵/۳۰",
        weight: "۷۹.۰ کیلوگرم",
        adherence: "۸۸٪ پایبندی",
        note: "۲ روز استراحت اضافه به دلیل خواب کم؛ رکورد اسکوات ثبت شد.",
        state: "done" as const,
    },
    {
        id: "w3",
        week: "هفته ۴",
        date: "۱۴۰۵/۰۵/۲۳",
        weight: "۷۹.۶ کیلوگرم",
        adherence: "۹۵٪ پایبندی",
        note: "بهترین هفته از نظر چسبیدن به رژیم؛ مصرف آب کامل بود.",
        state: "done" as const,
    },
    {
        id: "w4",
        week: "هفته ۳",
        date: "۱۴۰۵/۰۵/۱۶",
        weight: "۸۰.۲ کیلوگرم",
        adherence: "۸۱٪ پایبندی",
        note: "دور کمر ۰.۸ سانتی‌متر کم شد؛ نواحی شکم بهتر شد.",
        state: "done" as const,
    },
];

const fa = (value: number, digits = 0) =>
    value.toLocaleString("fa-IR", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    });

const signed = (value: number, digits = 0) => {
    const abs = Math.abs(value);
    const body = fa(abs, digits);
    if (value === 0) return fa(0, digits);
    return `${value > 0 ? "+" : "−"}${body}`;
};

const buildPoints = (values: number[]) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const span = max - min || 1;
    return values.map((value, index) => ({
        value,
        x: 14 + (index / Math.max(1, values.length - 1)) * 292,
        y: 14 + ((value - min) / span) * 92,
    }));
};

export default function ProgressPage() {
    const [metricKey, setMetricKey] = useState<MetricKey>("weight");
    const [rangeId, setRangeId] = useState<RangeId>("6w");

    const metric = metrics.find((item) => item.key === metricKey) ?? metrics[0];
    const range = ranges.find((item) => item.id === rangeId) ?? ranges[1];

    const startIndex = Math.max(0, metric.values.length - range.count);
    const values = useMemo(
        () => metric.values.slice(startIndex),
        [metric, startIndex]
    );

    const points = useMemo(() => buildPoints(values), [values]);
    const linePath = points.map((point) => `${point.x},${point.y}`).join(" ");
    const areaPath = `M ${points[0].x},108 ${points
        .map((point) => `L ${point.x},${point.y}`)
        .join(" ")} L ${points[points.length - 1].x},108 Z`;

    const current = values[values.length - 1];
    const first = values[0];
    const change = current - first;
    const digits = metric.digits;

    const weight = metrics[0];
    const weightNow = weight.values[weight.values.length - 1];
    const goalProgress = Math.round(
        ((weight.start - weightNow) / (weight.start - weight.goal)) * 100
    );

    return (
        <>
            {/* عنوان صفحه */}
            <section className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 className="dash-heading text-xl md:text-2xl font-extrabold">
                        پیشرفت من
                    </h2>
                    <p className="dash-muted text-xs md:text-sm mt-1.5">
                        روند وزن، اندازه‌های بدن، رکوردها و گزارش‌های هفتگی
                    </p>
                </div>
                <div className="dash-chip flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold">
                    <IconCalendarEvent size={18} stroke={1.8} />
                    <span>هفته ۶ از ۱۲ دوره</span>
                </div>
            </section>

            {/* خلاصه هدف */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="hero-panel fp-glow rounded-2xl p-5 md:p-6 lg:col-span-2 flex flex-col justify-between gap-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold">
                                <IconTarget size={14} stroke={1.8} />
                                هدف فعلی
                            </span>
                            <h3 className="mt-3 text-lg md:text-xl font-extrabold">
                                کاهش ۶ کیلوگرم تا پایان دوره
                            </h3>
                            <p className="mt-1.5 text-xs leading-relaxed opacity-75">
                                از ۸۲ کیلوگرم به ۷۶ کیلوگرم — مربی: رضا کریمی
                            </p>
                        </div>
                        <div className="dash-chip rounded-xl px-3 py-2 text-center shrink-0">
                            <p className="text-lg font-extrabold leading-none">
                                {fa(goalProgress)}٪
                            </p>
                            <p className="mt-1 text-[10px] opacity-70">از هدف</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between text-[11px] opacity-75 mb-2">
                            <span>
                                {fa(weight.start - weightNow, 1)} کیلوگرم کاهش از شروع
                            </span>
                            <span>
                                {fa(weightNow - weight.goal, 1)} کیلوگرم تا هدف
                            </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
                            <div
                                className="h-full rounded-full bg-[var(--hero-accent)] transition-all duration-300"
                                style={{ width: `${goalProgress}%` }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-xl border border-white/15 bg-white/5 px-2 py-2">
                            <p className="text-[10px] opacity-70">وزن شروع</p>
                            <p className="mt-1 text-sm font-extrabold">۸۲.۰</p>
                        </div>
                        <div className="rounded-xl border border-white/25 bg-white/10 px-2 py-2">
                            <p className="text-[10px] opacity-70">وزن فعلی</p>
                            <p className="mt-1 text-sm font-extrabold">۷۸.۴</p>
                        </div>
                        <div className="rounded-xl border border-white/15 bg-white/5 px-2 py-2">
                            <p className="text-[10px] opacity-70">وزن هدف</p>
                            <p className="mt-1 text-sm font-extrabold">۷۶.۰</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button className="btn-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold">
                            <IconScale size={16} stroke={2} />
                            ثبت وزن جدید
                        </button>
                        <button className="rounded-xl border border-white/25 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-white/10">
                            گزارش کامل دوره
                        </button>
                    </div>
                </div>

                {/* آمار کلیدی */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="dash-card rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="dash-muted text-[11px]">تغییر وزن کل</p>
                            <p className="dash-heading mt-1 text-lg font-extrabold">
                                {fa(weight.start - weightNow, 1)}−
                            </p>
                            <p className="dash-muted text-[10px]">کیلوگرم در ۶ هفته</p>
                        </div>
                        <div className="dash-chip flex h-11 w-11 items-center justify-center rounded-full shrink-0">
                            <IconScale size={22} stroke={1.8} />
                        </div>
                    </div>
                    <div className="dash-card rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="dash-muted text-[11px]">هفته‌های پیوسته</p>
                            <p className="dash-heading mt-1 text-lg font-extrabold">
                                ۶ هفته
                            </p>
                            <p className="dash-muted text-[10px]">بدون وقفه در ثبت</p>
                        </div>
                        <div className="dash-chip flex h-11 w-11 items-center justify-center rounded-full shrink-0">
                            <IconFlame size={22} stroke={1.8} />
                        </div>
                    </div>
                    <div className="dash-card rounded-2xl p-4 flex items-center justify-between col-span-2 lg:col-span-1">
                        <div>
                            <p className="dash-muted text-[11px]">جلسات انجام‌شده</p>
                            <p className="dash-heading mt-1 text-lg font-extrabold">
                                ۲۸ جلسه
                            </p>
                            <p className="dash-muted text-[10px]">از ۳۰ جلسه برنامه</p>
                        </div>
                        <div className="dash-chip flex h-11 w-11 items-center justify-center rounded-full shrink-0">
                            <IconBarbell size={22} stroke={1.8} />
                        </div>
                    </div>
                </div>
            </section>

            {/* نمودار روند */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="dash-card rounded-2xl p-5 lg:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h3 className="dash-heading text-base font-bold">
                                روند {metric.label}
                            </h3>
                            <p className="dash-muted mt-1 text-[11px]">
                                {fa(first, digits)} به {fa(current, digits)} {metric.unit} ·{" "}
                                {signed(change, digits)} {metric.unit}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {ranges.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setRangeId(item.id)}
                                    className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-colors ${
                                        rangeId === item.id
                                            ? "bg-[var(--hero-accent)] text-[var(--hero-accent-ink)]"
                                            : "dash-control"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5 border-b border-[var(--dash-line)] pb-4">
                        {metrics.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => setMetricKey(item.key)}
                                className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-colors ${
                                    metricKey === item.key ? "dash-chip" : "dash-muted"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-5">
                        <svg
                            viewBox="0 0 320 120"
                            className="h-auto w-full"
                            role="img"
                            aria-label={`نمودار ${metric.label}`}
                        >
                            {[14, 55, 96].map((y) => (
                                <line
                                    key={y}
                                    x1="8"
                                    y1={y}
                                    x2="312"
                                    y2={y}
                                    style={{ stroke: "var(--dash-line)" }}
                                    strokeWidth="1"
                                    strokeDasharray="3 6"
                                />
                            ))}
                            <path d={areaPath} style={{ fill: "var(--dash-chip-bg)" }} />
                            <polyline
                                points={linePath}
                                fill="none"
                                style={{ stroke: "var(--hero-accent)" }}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            {points.map((point, index) => (
                                <circle
                                    key={index}
                                    cx={point.x}
                                    cy={point.y}
                                    r={index === points.length - 1 ? 4.5 : 2.5}
                                    style={{ fill: "var(--hero-accent)" }}
                                />
                            ))}
                        </svg>
                        <div className="dash-muted mt-1 flex items-center justify-between text-[10px]">
                            {values.map((_, index) => (
                                <span key={index}>هفته {fa(startIndex + index + 1)}</span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--dash-line)] pt-4 text-[11px]">
                        <span className="dash-muted flex items-center gap-1.5">
                            <IconClock size={14} stroke={1.8} />
                            آخرین اندازه‌گیری: ۲ روز پیش
                        </span>
                        <button className="dash-control rounded-lg px-3 py-1.5 font-bold">
                            افزودن اندازه‌گیری
                        </button>
                    </div>
                </div>

                {/* خلاصه تغییرات */}
                <div className="dash-card rounded-2xl p-5">
                    <h3 className="dash-heading text-sm font-bold">خلاصه تغییرات</h3>
                    <p className="dash-muted mt-1 text-[11px]">
                        از ابتدای دوره تا امروز
                    </p>
                    <div className="mt-3 divide-y divide-[var(--dash-line)]">
                        {metrics.map((item) => {
                            const last = item.values[item.values.length - 1];
                            const diff = last - item.values[0];
                            const isActive = item.key === metricKey;
                            return (
                                <button
                                    key={item.key}
                                    onClick={() => setMetricKey(item.key)}
                                    className="flex w-full items-center justify-between gap-3 py-3 text-right"
                                >
                                    <div>
                                        <p
                                            className={`text-xs font-bold ${
                                                isActive
                                                    ? "dash-heading"
                                                    : "dash-muted"
                                            }`}
                                        >
                                            {item.label}
                                        </p>
                                        <p className="dash-muted mt-0.5 text-[10px]">
                                            از {fa(item.values[0], item.digits)} به{" "}
                                            {fa(last, item.digits)} {item.unit}
                                        </p>
                                    </div>
                                    <span className="dash-chip flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold shrink-0">
                                        <IconBolt size={12} stroke={2} />
                                        {signed(diff, item.digits)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-3 rounded-xl border border-[var(--dash-line)] p-3 text-[11px]">
                        <p className="dash-heading flex items-center gap-1.5 font-bold">
                            <IconTrophy size={14} stroke={1.8} />
                            نکته مربی
                        </p>
                        <p className="dash-muted mt-1.5 leading-relaxed">
                            روند نزولی وزن ثابت است؛ برای حفظ عضله، پروتئین روزانه
                            را زیر ۱۲۰ گرم نیاور.
                        </p>
                    </div>
                </div>
            </section>

            {/* اندازه‌های بدن و رکوردها */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="dash-card rounded-2xl p-5 lg:col-span-2">
                    <div className="flex items-center justify-between border-b border-[var(--dash-line)] pb-3">
                        <div>
                            <h3 className="dash-heading text-sm font-bold">
                                اندازه‌های بدن
                            </h3>
                            <p className="dash-muted mt-0.5 text-[11px]">
                                مقایسه با اولین اندازه‌گیری دوره
                            </p>
                        </div>
                        <span className="dash-chip rounded-lg px-2.5 py-1 text-[10px] font-bold">
                            {fa(bodyRows.length)} مورد
                        </span>
                    </div>

                    <div className="mt-1 divide-y divide-[var(--dash-line)]">
                        {bodyRows.map((row) => {
                            const diff = row.current - row.start;
                            return (
                                <div
                                    key={row.id}
                                    className="flex items-center justify-between gap-3 py-3"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="dash-chip flex h-8 w-8 items-center justify-center rounded-lg shrink-0">
                                            <IconScale size={16} stroke={1.8} />
                                        </span>
                                        <div>
                                            <p className="dash-heading text-xs font-bold">
                                                {row.label}
                                            </p>
                                            <p className="dash-muted text-[10px]">
                                                شروع {fa(row.start, 1)} · فعلی{" "}
                                                {fa(row.current, 1)} {row.unit}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-md border border-[var(--dash-line)] px-2 py-0.5 text-[10px] font-bold shrink-0">
                                        {signed(diff, 1)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="dash-card rounded-2xl p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="dash-heading text-sm font-bold">رکوردهای شخصی</h3>
                        <IconTrophy size={18} stroke={1.8} className="dash-muted" />
                    </div>
                    <div className="mt-2 divide-y divide-[var(--dash-line)]">
                        {records.map((record) => (
                            <div key={record.id} className="py-3">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="dash-heading text-xs font-bold">
                                        {record.move}
                                    </p>
                                    <span className="dash-chip rounded-md px-2 py-0.5 text-[10px] font-bold shrink-0">
                                        {record.delta}
                                    </span>
                                </div>
                                <div className="dash-muted mt-1 flex items-center justify-between text-[10px]">
                                    <span>{record.value}</span>
                                    <span className="flex items-center gap-1">
                                        <IconCalendarEvent size={12} stroke={1.8} />
                                        {record.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="dash-control mt-3 w-full rounded-xl px-4 py-2 text-xs font-bold">
                        ثبت رکورد جدید
                    </button>
                </div>
            </section>

            {/* گزارش‌های هفتگی */}
            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="dash-heading text-base font-bold">گزارش‌های هفتگی</h3>
                    <span className="dash-muted text-xs">{fa(reports.length)} گزارش</span>
                </div>
                <div className="dash-card overflow-hidden rounded-2xl">
                    {reports.map((report, index) => (
                        <div
                            key={report.id}
                            className={`flex flex-wrap items-start justify-between gap-3 p-4 md:p-5 ${
                                index !== reports.length - 1
                                    ? "border-b border-[var(--dash-line)]"
                                    : ""
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                        report.state === "today"
                                            ? "bg-[var(--hero-accent)] text-[var(--hero-accent-ink)]"
                                            : "dash-chip"
                                    }`}
                                >
                                    {report.state === "today" ? (
                                        <IconFlame size={20} stroke={1.9} />
                                    ) : (
                                        <IconCheck size={20} stroke={2.2} />
                                    )}
                                </span>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="dash-heading text-sm font-bold">
                                            {report.week}
                                        </p>
                                        {report.state === "today" && (
                                            <span className="rounded-md bg-[var(--hero-accent)] px-2 py-0.5 text-[10px] font-bold text-[var(--hero-accent-ink)]">
                                                جاری
                                            </span>
                                        )}
                                    </div>
                                    <p className="dash-muted mt-0.5 text-[11px]">
                                        {report.date} · {report.weight}
                                    </p>
                                    <p className="dash-muted mt-1.5 max-w-xl text-[11px] leading-relaxed">
                                        {report.note}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-[11px]">
                                <span className="dash-chip rounded-lg px-2.5 py-1 font-bold">
                                    {report.adherence}
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
