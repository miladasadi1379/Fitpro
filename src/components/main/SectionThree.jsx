import Image from "next/image";

import Dash from '@/src/assets/home/dashboard.webp';
import { Marker, MarkerContent } from "@/components/ui/marker"
import { IconFileTextCheck, IconLayoutSidebarLeftExpand, IconChevronsDown } from '@tabler/icons-react';

export default function SecThree() {
    return (
        <section className="fp-wash fp-glow ">
            <Marker variant="separator" className="mt-0  ">
                <MarkerContent >فیت پرو</MarkerContent>
            </Marker>
            <div className="max-w-7xl mx-auto ">
                <div className="flexC mt-5">
                    <span className="font-bold text-2xl fp-accent-ink border-x-2">
                        <IconChevronsDown stroke={2} />
                        <IconChevronsDown stroke={2} />
                        <IconChevronsDown stroke={2} />
                    </span>
                </div>
                <div>
                    <div className="flexC mt-5">
                        <IconLayoutSidebarLeftExpand size='50' className="p-1  fp-accent-ink" />
                        <span className="font-bold text-5xl fp-heading ">
                            پنل <span className="fp-accent-ink">حرفه ای</span> برای شما
                        </span>
                    </div>
                    <div className="flexC mt-5">
                        <IconFileTextCheck stroke={2} size='40' className="p-1  fp-accent-ink" />
                        <span className="font-bold text-2xl fp-heading ">
                            از گزارش روزانه تا محاسبه کالری و تعیین هدف
                        </span>
                    </div>

                    <Image src={Dash} alt="FitPro Fitness Character" className="w-full h-auto" />
                </div>
                <Marker variant="separator" className="mt-1  ">
                    <MarkerContent >فیت پرو</MarkerContent>
                </Marker>
            </div>
        </section>
    )
}
