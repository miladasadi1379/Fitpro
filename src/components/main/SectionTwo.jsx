import Image from "next/image";

import Pic from '@/src/assets/home/two.webp';
import abs from '@/src/assets/home/abs.webp';
import mountain from '@/src/assets/home/mountain.webp';
import pull from '@/src/assets/home/pull.webp';

export default function SecTwo() {
    return (
        <section className=" fp-glow py-16 px-6  shadow-2xl">

            <div className="max-w-7xl mx-auto">
                <div>
                    <Image src={Pic} loading="eager" alt="FitPro Fitness Character" className="w-full h-auto" />
                </div>
                <div className="text-center mb-12">
                    <span className="inline-block hero-badge text-sm font-bold px-4 py-1.5 rounded-full mb-3">
                        دسته‌بندی تمرینات
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold fp-heading ">
                        برنامه‌های تخصصی <span className="hero-title-mark">فیت پرو</span>
                    </h2>
                    <p className="fp-muted mt-2">برنامه مناسب خود را انتخاب کنید و تمرین در خانه را شروع کنید</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <button className="fp-card rounded-2xl overflow-hidden btn-soft transition-all flex flex-col">
                        <Image src={abs} alt="شکم و پهلو" className="w-full h-55 object-cover mt-3 " />
                        <div className="p-6 flex flex-col flex-1 justify-between">
                            <div>
                                <h3 className="text-xl font-extrabold fp-heading mb-2 ">شکم و پهلو <span className="Inter">Ab Workout</span></h3>
                                <p className="text-sm fp-muted mb-6">تمرینات فشرده و هدفمند برای چربی‌سوزی شکم و ساخت سیکس‌پک در خانه.</p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t fp-divider">
                                <span className="text-xs font-semibold fp-meta">سطح: متوسط</span>
                                <div className="btn-soft text-sm px-4 py-2 rounded-xl">
                                    انتخاب برنامه
                                </div>
                            </div>
                        </div>
                    </button>

                    <button className="fp-card rounded-2xl overflow-hidden btn-soft transition-all flex flex-col">
                        <Image src={pull} alt="بدنسازی و فرم‌دهی کل بدن" className="w-full h-55 object-cover  mt-3 " />
                        <div className="p-6 flex flex-col flex-1 justify-between">
                            <div>
                                <h3 className="text-xl font-bold fp-heading mb-2">بدنسازی و فرم‌دهی کل بدن</h3>
                                <p className="text-sm fp-muted mb-6">برنامه کامل با دمبل و وزن بدن برای تقویت عضلات و افزایش استقامت.</p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t fp-divider">
                                <span className="text-xs font-semibold fp-meta">سطح: مقدماتی تا پیشرفته</span>
                                <div className="btn-soft text-sm px-4 py-2 rounded-xl">
                                    انتخاب برنامه
                                </div>
                            </div>
                        </div>
                    </button>

                    <div className="fp-card rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col">
                        <Image src={mountain} alt="چربی‌سوزی سریع" className="w-full h-55 object-cover  mt-3" />
                        <div className="p-6 flex flex-col flex-1 justify-between">
                            <div>
                                <h3 className="text-xl font-bold fp-heading mb-2">چربی‌سوزی سریع <span className="Inter">Cardio</span></h3>
                                <p className="text-sm fp-muted mb-6">حرکات هوازی پرانرژی برای افزایش ضربان قلب و کالری‌سوزی بالا.</p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t fp-divider">
                                <span className="text-xs font-semibold fp-meta">سطح: همه سطوح</span>
                                <button className="btn-soft text-sm px-4 py-2 rounded-xl">
                                    انتخاب برنامه
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
