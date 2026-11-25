import type { Metadata } from 'next';
import { DashboardShell } from '../../src/components/main/dashboard/dashboard-shell';

export const metadata: Metadata = {
    title: {
        default: 'داشبورد | FitPro',
        template: '%s | FitPro',
    },
    description: 'فیت پرو پنل مدیریت'
};
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardShell>{children}</DashboardShell>
};