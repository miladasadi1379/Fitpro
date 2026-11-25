'use client'
import Image from "next/image";
import onePic from '@/src/assets/home/c.png';
import onePicBg from '@/src/assets/home/bgOne.webp';
import { Marker, MarkerContent } from "@/components/ui/marker"

import { useTheme, } from "next-themes"
import { useEffect, useState } from "react"



export default function SecOne() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // تا قبل از mount شدن نباید روی theme تصمیم رندر گرفته شود
    const isDark = mounted && resolvedTheme === 'dark'
    return (
        <>
            <div className={isDark ? 'bg-zinc-900' : 'bg-white'}>
                <div className="min-h-screen">
                    <Image src={onePicBg} fill alt="a" className=" z-0 object-cover object-center fill-background  w-full bg-cover bg-center" />
                    <section className="flexC  m-auto  h-screen ">
                        <section className="flexC relative hero-surface z-9  mx-3 rounded-2xl max-sm:flexC">
                            <div className=" z-1 max-w-7xl grid grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 md:grid-cols-2 gap-1 items-center ">

                                <div>
                                    <Image src={onePic} alt="FitPro Fitness Character" className="w-full h-auto" />
                                </div>

                                <Marker variant="separator" className=" sm:rotate-0 md:rotate-90 w-[35%] absolute max-sm:right-[0%] max-sm:top-[55%] max-sm:w-[99%] max-md:w-[99%]  max-md:top-[60%]  md:right-[27%]">
                                    <MarkerContent >فیت پرو</MarkerContent>
                                </Marker>

                                <div className="ml-7  mr-7 text-right sm:flexC m-auto ">
                                    <span className="inline-block hero-badge text-sm font-bold px-4 py-1.5 rounded-full">
                                        اپلیکیشن تخصصی فیتنس
                                    </span>
                                    <h1 className="text-4xl md:text-5xl font-extrabold hero-title leading-tight mx-2">
                                        مسیر سلامتی و تناسب اندام در خانه با <span className="hero-title-mark">فیت پرو</span>
                                    </h1>
                                    <p className="text-lg hero-sub leading-relaxed mx-2 mt-2">
                                        برنامه‌های اختصاصی بدنسازی، چربی‌سوزی و تمرینات شکم را همیشه همراه خود داشته باشید و قدم به قدم پیشرفت کنید.
                                    </p>
                                    <div className="flex gap-4 justify-start my-3 p-2">
                                        <button className="btn-primary font-medium px-6 py-3 rounded-xl">
                                            شروع رایگان برنامه
                                        </button>
                                        <button className="btn-soft font-medium px-6 py-3 rounded-xl">
                                            مشاهده برنامه‌ها
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        </>
    );
}
