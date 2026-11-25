import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardShell } from "../../src/components/main/dashboard/dashboard-shell";

export const metadata: Metadata = {
    title: "پشتیبانی | FitPro",
    description: "پشتیبانی فیت پرو — تیکت‌ها، سوالات متداول و راه‌های ارتباط",
};

export default function SupportLayout({ children }: { children: ReactNode }) {
    return <DashboardShell>{children}</DashboardShell>;
}
