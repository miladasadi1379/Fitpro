"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/src/components/ui/toggle-theme';
import {
    IconHome,
    IconBarbell,
    IconToolsKitchen2,
    IconChartLine,
    IconHelpCircle,
    IconCalendar,
    IconBell,
    IconArrowBadgeLeft,
    IconUser,
    IconSettings,
    IconLogout,
    IconShoppingBagCheck
} from "@tabler/icons-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
    { id: "dashboard", label: "داشبورد", href: "/dashboard", icon: IconHome },
    { id: "workouts", label: "برنامه‌های من", href: "/dashboard/workouts", icon: IconBarbell },
    { id: "product", label: "خرید های من", href: "/dashboard/mycart", icon: IconShoppingBagCheck },
    { id: "nutrition", label: "تغذیه و رژیم", href: "/dashboard/nutrition", icon: IconToolsKitchen2 },
    { id: "progress", label: "پیشرفت من", href: "/dashboard/progress", icon: IconChartLine },
    { id: "support", label: "پشتیبانی", href: "/support", icon: IconHelpCircle },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);

    // ساخت تاریخ فقط روی کلاینت انجام می‌شود تا مقدار unstable در رندر سرور استفاده نشود.
    useEffect(() => {
        setSelectedDate(new DateObject({ calendar: persian, locale: persian_fa }));
    }, []);

    return (
        <div className="shadow-2x dash-page min-h-screen flex selection:bg-[var(--hero-accent)] selection:text-[var(--hero-accent-ink)]">
            {/* سایدبار ثابت سمت راست */}
            <aside className="shadow-2xl dash-side w-16 md:w-64 shrink-0 flex flex-col py-6 sticky top-0 h-screen transition-all duration-300 z-30">
                <div className="px-3 md:px-6 mb-10 flex items-center justify-center md:justify-start">
                    <Link
                        href="/"
                        className="dash-logo text-xl md:text-2xl font-extrabold tracking-tight"
                    >
                        <span className="hidden md:inline">FitPro</span>
                        <span className="dash-logo-mark md:hidden">FP</span>
                    </Link>
                </div>

                <nav className="flex-1 flex flex-col gap-2 px-2 md:px-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            item.href === pathname
                                ? true
                                : item.href === "/"
                                    ? pathname === "/"
                                    : item.href === "/dashboard"
                                        ? pathname === "/dashboard"
                                        : pathname.startsWith(item.href);

                        return (
                            <Tooltip key={item.id}>
                                <TooltipTrigger >
                                    <Link
                                        href={item.href}
                                        data-active={isActive ? "true" : "false"}
                                        className="dash-link w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3"
                                    >
                                        <Icon size={22} stroke={1.8} className="shrink-0" />
                                        <span className="hidden md:inline text-sm">{item.label}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="left"
                                    className="dash-tip md:hidden font-medium"
                                >
                                    {item.label}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </nav>

                <div>
                    <Tooltip >
                        <TooltipTrigger >
                            <div className="flexC">
                                <Link
                                    href='/'
                                    className='dash-link w-full flex items-center justify-center md:justify-around gap-3 px-3 py-3 mx-2 w-7xl'
                                >
                                    <span className="hidden md:inline text-sm  w-full pl-35">بازگشت</span>
                                    <IconArrowBadgeLeft size={22} stroke={1.8} className="shrink-0" />
                                </Link>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent
                            side="left"
                            className="dash-tip  font-medium"
                        >
                            <IconHome />
                        </TooltipContent>
                    </Tooltip>
                </div>
            </aside>

            {/* ستون سمت چپ: هدر ثابت + محتوای متغیر صفحات */}
            <div className="flex-1 flex flex-col min-w-0 shadow-2xl  ">
                <header className="px-4 md:px-8 pt-6 pb-4">
                    <div className="max-w-6xl mx-auto flex flex-nowrap items-center justify-between gap-2 md:gap-4 border-b-2 mb-2 pb-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 md:gap-3 p-1 md:p-1.5 rounded-2xl hover:bg-[var(--dash-chip-bg)] transition-colors text-right outline-none">
                                    <Avatar className="h-9 w-9 md:h-11 md:w-11 border-2 border-[var(--hero-accent)]">
                                        <AvatarImage src="/avatar-placeholder.png" alt="علی" />
                                        <AvatarFallback className="dash-chip font-bold">
                                            ع
                                        </AvatarFallback>
                                    </Avatar>

                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="start"
                                className=" w-56 p-5"
                            >
                                <DropdownMenuLabel className="dash-muted font-normal text-xs">
                                    حساب کاربری
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="nav-menu-sep" />
                                <DropdownMenuItem className="nav-menu-item gap-2 cursor-pointer p-3 font-thin">
                                    <IconUser size={18} />
                                    <span>مشاهده پروفایل</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="nav-menu-item gap-2 cursor-pointer p-3">
                                    <IconSettings size={18} />
                                    <span>تنظیمات بدن و اهداف</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="nav-menu-sep" />
                                <DropdownMenuItem className="nav-menu-item nav-menu-danger gap-2 cursor-pointer p-3">
                                    <IconLogout size={18} />
                                    <span>خروج از حساب</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex shrink-0 items-center gap-1.5 md:gap-2.5">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        className="dash-control flex shrink-0 items-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-3.5 md:py-2.5 rounded-xl text-[10px] md:text-sm whitespace-nowrap"
                                    >
                                        <IconCalendar className="text-[var(--hero-accent)] size-4 md:size-[30px]" />
                                        <span>
                                            {selectedDate
                                                ? selectedDate.format("YYYY/MM/DD")
                                                : "تاریخ روز"}
                                        </span>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="end"
                                    className="dash-pop w-auto p-0 shadow-2xl"
                                >
                                    <DatePicker
                                        value={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        calendar={persian}
                                        locale={persian_fa}
                                        calendarPosition="bottom-left"
                                        className="green-dark-calendar"
                                    />
                                </PopoverContent>
                            </Popover>

                            <Button
                                variant='ghost'
                                aria-label="اعلان‌ها"
                                className="nav-btn size-9 md:size-13 p-1.5 md:p-2.5 rounded-4xl shrink-0"
                            >
                                <IconBell className="size-5 md:size-8" />
                            </Button>
                            {ModeToggle()}
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-4 md:px-8 pb-8 pt-2">
                    <div className="max-w-6xl mx-auto space-y-6">{children}</div>
                </main>
            </div>
        </div>
    );
}