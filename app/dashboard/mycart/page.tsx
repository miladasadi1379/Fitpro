"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
    IconBarbell,
    IconCalendarEvent,
    IconCheck,
    IconCreditCard,
    IconDownload,
    IconDroplet,
    IconFileInvoice,
    IconReceipt,
    IconRefresh,
    IconShoppingBag,
    IconTruck,
    IconUsers,
} from "@tabler/icons-react";

type OrderState = "active" | "done" | "waiting";

type Order = {
    id: string;
    code: string;
    title: string;
    kind: "دوره" | "مکمل" | "خدمات";
    coach: string;
    date: string;
    price: string;
    method: string;
    state: OrderState;
    note: string;
};

const orders: Order[] = [
    {
        id: "o1",
        code: "FP-۱۰۲۴",
        title: "دوره ۶ هفته‌ای تناسب اندام",
        kind: "دوره",
        coach: "مربی: رضا کریمی",
        date: "۱۴۰۵/۰۶/۰۱",
        price: "۱٬۸۰۰٬۰۰۰ تومان",
        method: "پرداخت یک‌جا",
        state: "active",
        note: "۱۸ جلسه — تا ۱۴۰۵/۰۷/۱۵ فعال",
    },
    {
        id: "o2",
        code: "FP-۱۰۱۹",
        title: "پروتئین وی ۲ کیلوگرمی — طعم وانیل",
        kind: "مکمل",
        coach: "ارسال: پست پیشتاز",
        date: "۱۴۰۵/۰۵/۲۸",
        price: "۲٬۴۵۰٬۰۰۰ تومان",
        method: "پرداخت آنلاین",
        state: "waiting",
        note: "کد رهگیری: ۱۲۴۵۶۷۸۹ — در حال ارسال",
    },
    {
        id: "o3",
        code: "FP-۱۰۱۲",
        title: "برنامه ۴ هفته‌ای چربی‌سوزی",
        kind: "دوره",
        coach: "مربی: سارا احمدی",
        date: "۱۴۰۵/۰۵/۰۱",
        price: "۱٬۲۰۰٬۰۰۰ تومان",
        method: "پرداخت یک‌جا",
        state: "done",
        note: "۴ هفته — پایان یافته در ۱۴۰۵/۰۵/۳۰",
    },
    {
        id: "o4",
        code: "FP-۱۰۰۵",
        title: "تحلیل ترکیب بدن (InBody)",
        kind: "خدمات",
        coach: "سالن مرکزی — طبقه دوم",
        date: "۱۴۰۵/۰۴/۱۸",
        price: "۳۵۰٬۰۰۰ تومان",
        method: "پرداخت در محل",
        state: "done",
        note: "گزارش در بخش «پیشرفت من» ثبت شد",
    },
];

const tabs = ["همه", "دوره‌ها", "مکمل‌ها", "خدمات"] as const;
type Tab = (typeof tabs)[number];

const tabFilter: Record<Tab, Order["kind"] | null> = {
    همه: null,
    دوره‌ها: "دوره",
    مکمل‌ها: "مکمل",
    خدمات: "خدمات",
};

const stateMeta: Record<OrderState, { label: string; className: string }> = {
    active: {
        label: "فعال",
        className: "bg-[var(--hero-accent)] text-[var(--hero-accent-ink)]",
    },
    waiting: {
        label: "در حال ارسال",
        className: "bg-[var(--dash-chip-bg)] text-[var(--dash-chip-ink)]",
    },
    done: {
        label: "تکمیل شده",
        className: "border border-[var(--dash-line)]",
    },
};

const kindIcon: Record<Order["kind"], ReactNode> = {
    دوره: <IconBarbell size={20} stroke={1.8} />,
    مکمل: <IconDroplet size={20} stroke={1.8} />,
    خدمات: <IconUsers size={20} stroke={1.8} />,
};

export default function MyCartPage() {
    const [tab, setTab] = useState<Tab>("همه");
    const [openId, setOpenId] = useState<string | null>("o1");

    const list = useMemo(() => {
        const filter = tabFilter[tab];
        return filter ? orders.filter((item) => item.kind === filter) : orders;
    }, [tab]);

    const total = useMemo(
        () =>
            orders.filter((item) => item.state !== "done").length,
        []
    );

    return (
        <>
            {/* عنوان صفحه */}
            <section className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 className="dash-heading text-xl md:text-2xl font-extrabold">
                        خرید های من
                    </h2>
                    <p className="dash-muted text-xs md:text-sm mt-1.5">
                        دوره‌های فعال، سفارش‌های مکمل و فاکتورهای قبلی
                    </p>
                </div>
                <div className="dash-chip flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold">
                    <IconShoppingBag size={18} stroke={1.8} />
                    <span>{total} سفارش در جریان</span>
                </div>
            </section>

            {/* خلاصه بالا */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="hero-panel fp-glow rounded-2xl p-5 md:p-6 lg:col-span-2 flex flex-col justify-between gap-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold">
                                <IconCreditCard size={14} stroke={1.8} />
                                عضویت فعال
                            </span>
                            <h3 className="mt-3 text-lg md:text-xl font-extrabold">
                                اشتراک ماهانه باشگاه — سطح حرفه‌ای
                            </h3>
                            <p className="mt-1.5 text-xs leading-relaxed opacity-75">
                                دسترسی به سالن، کلاس‌های گروهی و مربی آنلاین
                            </p>
                        </div>
                        <div className="dash-chip rounded-xl px-3 py-2 text-center shrink-0">
                            <p className="text-lg font-extrabold leading-none">۲۳</p>
                            <p className="mt-1 text-[10px] opacity-70">روز باقی‌مانده</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between text-[11px] opacity-75 mb-2">
                            <span>دوره بعدی: ۱۴۰۵/۰۷/۰۸</span>
                            <span>تمدید خودکار فعال است</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
                            <div
                                className="h-full rounded-full bg-[var(--hero-accent)] transition-all duration-300"
                                style={{ width: "74%" }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button className="btn-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold">
                            <IconRefresh size={16} stroke={2} />
                            تمدید اشتراک
                        </button>
                        <button className="rounded-xl border border-white/25 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-white/10">
                            مدیریت پرداخت
                        </button>
                    </div>
                </div>

                {/* آمار خرید */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="dash-card rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="dash-muted text-[11px]">مجموع خرید امسال</p>
                            <p className="dash-heading mt-1 text-lg font-extrabold">
                                ۵٬۸۰۰٬۰۰۰
                            </p>
                            <p className="dash-muted text-[10px]">تومان</p>
                        </div>
                        <div className="dash-chip flex h-11 w-11 items-center justify-center rounded-full shrink-0">
                            <IconReceipt size={22} stroke={1.8} />
                        </div>
                    </div>
                    <div className="dash-card rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="dash-muted text-[11px]">فاکتورهای ثبت‌شده</p>
                            <p className="dash-heading mt-1 text-lg font-extrabold">
                                {orders.length} مورد
                            </p>
                        </div>
                        <div className="dash-chip flex h-11 w-11 items-center justify-center rounded-full shrink-0">
                            <IconFileInvoice size={22} stroke={1.8} />
                        </div>
                    </div>
                </div>
            </section>

            {/* تب‌های فیلتر */}
            <section>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="dash-heading text-base font-bold">سفارش‌های من</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {tabs.map((item) => (
                            <button
                                key={item}
                                onClick={() => setTab(item)}
                                className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-colors ${tab === item
                                    ? "bg-[var(--hero-accent)] text-[var(--hero-accent-ink)]"
                                    : "dash-control"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="dash-card overflow-hidden rounded-2xl">
                    {list.map((order, index) => {
                        const isOpen = openId === order.id;
                        const meta = stateMeta[order.state];
                        return (
                            <div
                                key={order.id}
                                className={index !== list.length - 1 ? "border-b border-[var(--dash-line)]" : ""}
                            >
                                <button
                                    onClick={() => setOpenId(isOpen ? null : order.id)}
                                    className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-right md:p-5"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="dash-chip flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                                            {kindIcon[order.kind]}
                                        </span>
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="dash-heading text-sm font-bold">
                                                    {order.title}
                                                </p>
                                                <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${meta.className}`}>
                                                    {meta.label}
                                                </span>
                                            </div>
                                            <p className="dash-muted mt-0.5 text-[11px]">
                                                {order.code} · {order.coach}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-[11px]">
                                        <span className="dash-muted flex items-center gap-1">
                                            <IconCalendarEvent size={14} stroke={1.8} />
                                            {order.date}
                                        </span>
                                        <span className="dash-heading font-extrabold">
                                            {order.price}
                                        </span>
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="border-t border-[var(--dash-line)] bg-[var(--dash-chip-bg)] px-4 py-4 md:px-5">
                                        <div className="grid grid-cols-1 gap-3 text-[11px] sm:grid-cols-3">
                                            <div>
                                                <p className="dash-muted">روش پرداخت</p>
                                                <p className="dash-heading mt-1 font-bold">{order.method}</p>
                                            </div>
                                            <div>
                                                <p className="dash-muted">وضعیت</p>
                                                <p className="dash-heading mt-1 font-bold">{order.note}</p>
                                            </div>
                                            <div>
                                                <p className="dash-muted">نوع خرید</p>
                                                <p className="dash-heading mt-1 font-bold">{order.kind}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <button className="dash-control flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold">
                                                <IconDownload size={14} stroke={1.8} />
                                                دانلود فاکتور
                                            </button>
                                            {order.state === "waiting" && (
                                                <button className="dash-control flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold">
                                                    <IconTruck size={14} stroke={1.8} />
                                                    پیگیری مرسوله
                                                </button>
                                            )}
                                            {order.state === "active" && (
                                                <button className="btn-primary rounded-lg px-3 py-1.5 text-[11px] font-bold">
                                                    رفتن به برنامه
                                                </button>
                                            )}
                                            {order.state === "done" && (
                                                <button className="dash-control flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold">
                                                    <IconCheck size={14} stroke={2.2} />
                                                    مشاهده گزارش
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* روش پرداخت‌ها */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="dash-card rounded-2xl p-5 lg:col-span-2">
                    <div className="flex items-center justify-between border-b border-[var(--dash-line)] pb-3">
                        <h3 className="dash-heading text-sm font-bold">روش‌های پرداخت</h3>
                        <button className="dash-control rounded-lg px-3 py-1.5 text-[11px] font-bold">
                            افزودن کارت
                        </button>
                    </div>
                    <div className="mt-2 divide-y divide-[var(--dash-line)]">
                        <div className="flex items-center justify-between gap-3 py-3">
                            <div className="flex items-center gap-3">
                                <span className="dash-chip flex h-9 w-9 items-center justify-center rounded-lg">
                                    <IconCreditCard size={18} stroke={1.8} />
                                </span>
                                <div>
                                    <p className="dash-heading text-xs font-bold">•••• ۴۵۸۲ — بانک ملت</p>
                                    <p className="dash-muted text-[10px]">کارت اصلی · انقضا ۰۹/۲۸</p>
                                </div>
                            </div>
                            <span className="rounded-md bg-[var(--hero-accent)] px-2 py-0.5 text-[10px] font-bold text-[var(--hero-accent-ink)]">
                                پیش‌فرض
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-3 py-3">
                            <div className="flex items-center gap-3">
                                <span className="dash-chip flex h-9 w-9 items-center justify-center rounded-lg">
                                    <IconCreditCard size={18} stroke={1.8} />
                                </span>
                                <div>
                                    <p className="dash-heading text-xs font-bold">•••• ۱۱۹۷ — بانک سامان</p>
                                    <p className="dash-muted text-[10px]">انقضا ۰۲/۲۹</p>
                                </div>
                            </div>
                            <button className="dash-muted text-[11px] font-bold underline-offset-4 hover:underline">
                                حذف
                            </button>
                        </div>
                    </div>
                </div>

                <div className="dash-card rounded-2xl p-5">
                    <h3 className="dash-heading text-sm font-bold">پشتیبانی خرید</h3>
                    <p className="dash-muted mt-2 text-xs leading-relaxed">
                        اگر سفارشی را دریافت نکردی یا مبلغی دو بار کم شده، تیکت
                        بزن؛ تا ۲۴ ساعت کاری بررسی می‌شود.
                    </p>
                    <button className="dash-control mt-4 w-full rounded-xl px-4 py-2 text-xs font-bold">
                        ثبت درخواست پشتیبانی
                    </button>
                </div>
            </section>
        </>
    );
}
