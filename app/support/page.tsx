"use client";

import { useMemo, useState } from "react";
import {
    IconBarbell,
    IconCalendarEvent,
    IconCheck,
    IconChevronLeft,
    IconClock,
    IconCreditCard,
    IconFileInvoice,
    IconHelpCircle,
    IconReceipt,
    IconToolsKitchen2,
    IconTrophy,
    IconUser,
} from "@tabler/icons-react";

type TicketState = "open" | "pending" | "closed";

type Ticket = {
    id: string;
    code: string;
    subject: string;
    category: "تمرین" | "تغذیه" | "پرداخت" | "حساب";
    date: string;
    state: TicketState;
    replies: number;
    last: string;
};

const tickets: Ticket[] = [
    {
        id: "t1",
        code: "TK-۴۸۲۱",
        subject: "برنامه تمرینی هفته آینده آپدیت نشده",
        category: "تمرین",
        date: "۱۴۰۵/۰۶/۰۶",
        state: "open",
        replies: 1,
        last: "سلام، برنامه هفته هفتم هنوز در بخش «برنامه‌های من» نمایش داده نمی‌شود. ممنون می‌شوم بررسی کنید.",
    },
    {
        id: "t2",
        code: "TK-۴۷۹۰",
        subject: "سفارش پروتئین وی — تاخیر در ارسال",
        category: "پرداخت",
        date: "۱۴۰۵/۰۵/۳۱",
        state: "pending",
        replies: 3,
        last: "مرسوله در مرکز پست استان شماست؛ کد رهگیری جدید تا فردا برایتان ثبت می‌شود.",
    },
    {
        id: "t3",
        code: "TK-۴۷۲۲",
        subject: "تغییر هدف کالری از ۱۶۰۰ به ۱۷۰۰",
        category: "تغذیه",
        date: "۱۴۰۵/۰۵/۲۴",
        state: "closed",
        replies: 2,
        last: "هدف روزانه به ۱۷۰۰ کالری تغییر کرد و در برنامه غذایی اعمال شد. موفق باشید.",
    },
    {
        id: "t4",
        code: "TK-۴۶۸۸",
        subject: "ورود با شماره موبایل کد تایید نمی‌فرستد",
        category: "حساب",
        date: "۱۴۰۵/۰۵/۱۲",
        state: "closed",
        replies: 4,
        last: "شماره شما تایید شد و مشکل ارسال پیامک برطرف شد؛ از این پس ورود انجام می‌شود.",
    },
    {
        id: "t5",
        code: "TK-۴۵۰۱",
        subject: "فاکتور خرید دوره ۶ هفته‌ای",
        category: "پرداخت",
        date: "۱۴۰۵/۰۴/۲۹",
        state: "closed",
        replies: 1,
        last: "فاکتور در بخش «خرید های من» قابل دانلود است. نسخه ایمیلی هم ارسال شد.",
    },
];

const tabs = ["همه", "باز", "در حال بررسی", "بسته"] as const;
type Tab = (typeof tabs)[number];

const tabFilter: Record<Tab, TicketState | null> = {
    همه: null,
    باز: "open",
    "در حال بررسی": "pending",
    بسته: "closed",
};

const stateMeta: Record<TicketState, { label: string; className: string }> = {
    open: {
        label: "باز",
        className: "bg-[var(--hero-accent)] text-[var(--hero-accent-ink)]",
    },
    pending: {
        label: "در حال بررسی",
        className: "bg-[var(--dash-chip-bg)] text-[var(--dash-chip-ink)]",
    },
    closed: {
        label: "بسته",
        className: "border border-[var(--dash-line)]",
    },
};

const topics = [
    {
        id: "p1",
        title: "تمرین و برنامه",
        note: "۲۴ مقاله · ویرایش برنامه، حرکات و جلسات",
        icon: <IconBarbell size={20} stroke={1.8} />,
    },
    {
        id: "p2",
        title: "تغذیه و رژیم",
        note: "۱۸ مقاله · کالری، وعده‌ها و مکمل",
        icon: <IconToolsKitchen2 size={20} stroke={1.8} />,
    },
    {
        id: "p3",
        title: "پرداخت و خرید",
        note: "۱۲ مقاله · فاکتور، اشتراک و مرسوله",
        icon: <IconCreditCard size={20} stroke={1.8} />,
    },
    {
        id: "p4",
        title: "حساب کاربری",
        note: "۹ مقاله · ورود، رمز و اطلاعات بدن",
        icon: <IconUser size={20} stroke={1.8} />,
    },
];

const faqs = [
    {
        id: "f1",
        q: "چطور می‌توانم برنامه تمرینی‌ام را عوض کنم؟",
        a: "از بخش «برنامه‌های من» روی کارت برنامه فعال گزینه «درخواست تغییر» را بزن یا یک تیکت با موضوع تمرین ثبت کن. مربی تا ۴۸ ساعت کاری برنامه را بازبینی و نسخه اصلاح‌شده را جایگزین می‌کند.",
    },
    {
        id: "f2",
        q: "کالری روزانه‌ام را چطور محاسبه می‌کنید؟",
        a: "بر اساس وزن، قد، سن، سطح فعالیت و هدف دوره محاسبه می‌شود. اگر وزن یا سطح فعالیت تغییر کرد، در بخش «تغذیه و رژیم» گزینه «ثبت وزن جدید» را بزن تا هدف روزانه به‌روزرسانی شود.",
    },
    {
        id: "f3",
        q: "چرا فاکتور خرید در بخش خرید های من نیست؟",
        a: "فاکتورها تا ۲۴ ساعت پس از پرداخت ثبت می‌شوند. اگر پرداخت از درگاه انجام شده ولی سفارش ساخته نشده، شماره پیگیری تراکنش را در تیکت بنویس تا بررسی شود.",
    },
    {
        id: "f4",
        q: "اشتراکم را می‌توانم لغو یا منتقل کنم؟",
        a: "لغو تمدید خودکار از بخش «خرید های من» انجام می‌شود و دسترسی تا پایان دوره فعلی باقی می‌ماند. انتقال اشتراک به شخص دیگر ممکن نیست.",
    },
    {
        id: "f5",
        q: "پاسخ تیکت چقدر طول می‌کشد؟",
        a: "میانگین پاسخ‌گویی ۲ ساعت کاری است. تیکت‌های مربوط به پرداخت در اولویت قرار می‌گیرند و در ساعات غیرکاری پاسخ روز کاری بعد ثبت می‌شود.",
    },
];

const toFa = (value: number) => value.toLocaleString("fa-IR");

export default function SupportPage() {
    const [tab, setTab] = useState<Tab>("همه");
    const [openId, setOpenId] = useState<string | null>("t1");
    const [faqId, setFaqId] = useState<string | null>("f1");

    const list = useMemo(() => {
        const filter = tabFilter[tab];
        return filter ? tickets.filter((item) => item.state === filter) : tickets;
    }, [tab]);

    const openCount = tickets.filter((item) => item.state !== "closed").length;

    return (
        <>
            {/* عنوان صفحه */}
            <section className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 className="dash-heading text-xl md:text-2xl font-extrabold">
                        پشتیبانی
                    </h2>
                    <p className="dash-muted text-xs md:text-sm mt-1.5">
                        تیکت‌ها، سوالات متداول و راه‌های تماس با تیم فیت پرو
                    </p>
                </div>
                <div className="dash-chip flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold">
                    <IconHelpCircle size={18} stroke={1.8} />
                    <span>{toFa(openCount)} درخواست در جریان</span>
                </div>
            </section>

            {/* خلاصه پشتیبانی */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="hero-panel fp-glow rounded-2xl p-5 md:p-6 lg:col-span-2 flex flex-col justify-between gap-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold">
                                <IconClock size={14} stroke={1.8} />
                                پاسخ‌گویی شنبه تا پنجشنبه
                            </span>
                            <h3 className="mt-3 text-lg md:text-xl font-extrabold">
                                تیم پشتیبانی FitPro کنارته
                            </h3>
                            <p className="mt-1.5 text-xs leading-relaxed opacity-75">
                                سوال تمرین، تغذیه، پرداخت یا حساب کاربری — تیکت بزن یا
                                با پشتیبان گفتگو کن.
                            </p>
                        </div>
                        <div className="dash-chip rounded-xl px-3 py-2 text-center shrink-0">
                            <p className="text-lg font-extrabold leading-none">۲ ساعت</p>
                            <p className="mt-1 text-[10px] opacity-70">میانگین پاسخ</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-xl border border-white/15 bg-white/5 px-2 py-2">
                            <p className="text-[10px] opacity-70">تیکت باز</p>
                            <p className="mt-1 text-sm font-extrabold">۱</p>
                        </div>
                        <div className="rounded-xl border border-white/25 bg-white/10 px-2 py-2">
                            <p className="text-[10px] opacity-70">در بررسی</p>
                            <p className="mt-1 text-sm font-extrabold">۱</p>
                        </div>
                        <div className="rounded-xl border border-white/15 bg-white/5 px-2 py-2">
                            <p className="text-[10px] opacity-70">بسته‌شده</p>
                            <p className="mt-1 text-sm font-extrabold">۳</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button className="btn-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold">
                            <IconFileInvoice size={16} stroke={2} />
                            ثبت تیکت جدید
                        </button>
                        <button className="rounded-xl border border-white/25 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-white/10">
                            گفتگو با پشتیبان
                        </button>
                    </div>
                </div>

                {/* آمار پشتیبانی */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="dash-card rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="dash-muted text-[11px]">ساعات پاسخ‌گویی</p>
                            <p className="dash-heading mt-1 text-lg font-extrabold">
                                ۹ تا ۲۱
                            </p>
                            <p className="dash-muted text-[10px]">شنبه تا پنجشنبه</p>
                        </div>
                        <div className="dash-chip flex h-11 w-11 items-center justify-center rounded-full shrink-0">
                            <IconCalendarEvent size={22} stroke={1.8} />
                        </div>
                    </div>
                    <div className="dash-card rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="dash-muted text-[11px]">رضایت از پاسخ‌ها</p>
                            <p className="dash-heading mt-1 text-lg font-extrabold">۹۴٪</p>
                            <p className="dash-muted text-[10px]">از ۱۲۴۰ بازخورد</p>
                        </div>
                        <div className="dash-chip flex h-11 w-11 items-center justify-center rounded-full shrink-0">
                            <IconTrophy size={22} stroke={1.8} />
                        </div>
                    </div>
                </div>
            </section>

            {/* موضوع‌های پرتکرار */}
            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="dash-heading text-base font-bold">موضوع‌های پرتکرار</h3>
                    <span className="dash-muted text-xs">راهنمای سریع</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {topics.map((topic) => (
                        <button
                            key={topic.id}
                            className="dash-card rounded-2xl p-4 text-right transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            <span className="dash-chip flex h-10 w-10 items-center justify-center rounded-xl">
                                {topic.icon}
                            </span>
                            <p className="dash-heading mt-3 text-sm font-bold">
                                {topic.title}
                            </p>
                            <p className="dash-muted mt-1 text-[11px] leading-relaxed">
                                {topic.note}
                            </p>
                        </button>
                    ))}
                </div>
            </section>

            {/* تیکت‌های من */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <h3 className="dash-heading text-base font-bold">تیکت‌های من</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {tabs.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setTab(item)}
                                    className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-colors ${
                                        tab === item
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
                        {list.map((ticket, index) => {
                            const isOpen = openId === ticket.id;
                            const meta = stateMeta[ticket.state];
                            return (
                                <div
                                    key={ticket.id}
                                    className={
                                        index !== list.length - 1
                                            ? "border-b border-[var(--dash-line)]"
                                            : ""
                                    }
                                >
                                    <button
                                        onClick={() => setOpenId(isOpen ? null : ticket.id)}
                                        className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-right md:p-5"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="dash-chip flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                                                <IconReceipt size={20} stroke={1.8} />
                                            </span>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="dash-heading text-sm font-bold">
                                                        {ticket.subject}
                                                    </p>
                                                    <span
                                                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${meta.className}`}
                                                    >
                                                        {meta.label}
                                                    </span>
                                                </div>
                                                <p className="dash-muted mt-0.5 text-[11px]">
                                                    {ticket.code} · {ticket.category} ·{" "}
                                                    {toFa(ticket.replies)} پاسخ
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 text-[11px]">
                                            <span className="dash-muted flex items-center gap-1">
                                                <IconCalendarEvent size={14} stroke={1.8} />
                                                {ticket.date}
                                            </span>
                                            <IconChevronLeft
                                                size={18}
                                                stroke={1.6}
                                                className={`dash-muted shrink-0 transition-transform duration-200 ${
                                                    isOpen ? "-rotate-90" : ""
                                                }`}
                                            />
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-[var(--dash-line)] bg-[var(--dash-chip-bg)] px-4 py-4 md:px-5">
                                            <p className="dash-muted text-[11px]">
                                                آخرین پیام تیم پشتیبانی
                                            </p>
                                            <p className="dash-heading mt-1 text-xs leading-relaxed">
                                                {ticket.last}
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {ticket.state !== "closed" ? (
                                                    <>
                                                        <button className="btn-primary rounded-lg px-3 py-1.5 text-[11px] font-bold">
                                                            پاسخ به تیکت
                                                        </button>
                                                        <button className="dash-control rounded-lg px-3 py-1.5 text-[11px] font-bold">
                                                            پیگیری وضعیت
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className="dash-control flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold">
                                                            <IconCheck size={14} stroke={2.2} />
                                                            بستن و ثبت بازخورد
                                                        </button>
                                                        <button className="dash-control rounded-lg px-3 py-1.5 text-[11px] font-bold">
                                                            بازگشایی تیکت
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {list.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                                <IconHelpCircle size={28} stroke={1.5} className="dash-muted" />
                                <p className="dash-heading text-sm font-bold">
                                    تیکتی در این وضعیت نیست
                                </p>
                                <p className="dash-muted text-xs">
                                    با «ثبت تیکت جدید» درخواستت را برای تیم پشتیبانی بفرست.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* راه‌های ارتباط */}
                <div className="space-y-4">
                    <div className="dash-card rounded-2xl p-5">
                        <h4 className="dash-heading text-sm font-bold">راه‌های ارتباط</h4>
                        <div className="mt-2 divide-y divide-[var(--dash-line)]">
                            <div className="flex items-center gap-3 py-3">
                                <span className="dash-chip flex h-9 w-9 items-center justify-center rounded-lg shrink-0">
                                    <IconHelpCircle size={18} stroke={1.8} />
                                </span>
                                <div>
                                    <p className="dash-heading text-xs font-bold">چت آنلاین</p>
                                    <p className="dash-muted text-[10px]">
                                        پاسخ فوری در ساعات کاری
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 py-3">
                                <span className="dash-chip flex h-9 w-9 items-center justify-center rounded-lg shrink-0">
                                    <IconUser size={18} stroke={1.8} />
                                </span>
                                <div>
                                    <p className="dash-heading text-xs font-bold">ارسال تیکت</p>
                                    <p className="dash-muted text-[10px]">
                                        support@fitpro.ir — پاسخ تا ۲ ساعت کاری
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 py-3">
                                <span className="dash-chip flex h-9 w-9 items-center justify-center rounded-lg shrink-0">
                                    <IconClock size={18} stroke={1.8} />
                                </span>
                                <div>
                                    <p className="dash-heading text-xs font-bold">تلفن پشتیبانی</p>
                                    <p className="dash-muted text-[10px]">
                                        ۰۲۱-۱۲۳۴۵۶۷۸ · ۹ تا ۲۱
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dash-card rounded-2xl p-5">
                        <h4 className="dash-heading text-sm font-bold">
                            قبل از ارسال تیکت
                        </h4>
                        <ul className="dash-muted mt-3 space-y-2 text-xs">
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--hero-accent)]" />
                                کد سفارش یا شماره تیکت را آماده کن
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--hero-accent)]" />
                                بخش سوالات متداول را اول بررسی کن
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--hero-accent)]" />
                                برای پرداخت، شماره پیگیری تراکنش را بنویس
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* سوالات متداول */}
            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="dash-heading text-base font-bold">سوالات متداول</h3>
                    <span className="dash-muted text-xs">{toFa(faqs.length)} سوال</span>
                </div>
                <div className="dash-card overflow-hidden rounded-2xl">
                    {faqs.map((faq, index) => {
                        const isOpen = faqId === faq.id;
                        return (
                            <div
                                key={faq.id}
                                className={
                                    index !== faqs.length - 1
                                        ? "border-b border-[var(--dash-line)]"
                                        : ""
                                }
                            >
                                <button
                                    onClick={() => setFaqId(isOpen ? null : faq.id)}
                                    className="flex w-full items-center justify-between gap-3 p-4 text-right md:px-5"
                                >
                                    <span className="dash-heading text-sm font-bold">
                                        {faq.q}
                                    </span>
                                    <IconChevronLeft
                                        size={18}
                                        stroke={1.6}
                                        className={`dash-muted shrink-0 transition-transform duration-200 ${
                                            isOpen ? "-rotate-90" : ""
                                        }`}
                                    />
                                </button>
                                {isOpen && (
                                    <p className="dash-muted max-w-3xl px-4 pb-4 text-xs leading-relaxed md:px-5">
                                        {faq.a}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
