import { IconClock, IconDroplet, IconFlame } from '@tabler/icons-react';

export default function DashboardPage() {
    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                {/* کارت ۱: مدت تمرین */}
                <div className="dash-card rounded-2xl p-5 flex items-center justify-between shadow-2xl">
                    <div>
                        <h2 className="font-bold text-base md:text-lg">مدت تمرین</h2>
                        <p className="dash-panel-muted text-xs md:text-sm mt-1">
                            ۴۵ دقیقه تمرین امروز
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-full dash-chip flex items-center justify-center shrink-0">
                        <IconClock size={24} stroke={2} />
                    </div>
                </div>

                {/* کارت ۲: مصرف آب */}
                <div className="dash-card rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-base md:text-lg">مصرف آب</h2>
                        <p className="dash-panel-muted text-xs md:text-sm mt-1">
                            ۱.۵ لیتر از ۲ لیتر
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-full dash-chip flex items-center justify-center shrink-0">
                        <IconDroplet size={24} stroke={2} />
                    </div>
                </div>

                {/* کارت ۳: فعالیت امروز */}
                <div className="dash-card rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-base md:text-lg">فعالیت امروز</h2>
                        <p className="dash-panel-muted text-xs md:text-sm mt-1">
                            کالری مصرفی: ۴۵۰ kcal
                        </p>
                    </div>
                    <div className="dash-chip w-12 h-12 rounded-full border-2 border-[var(--hero-accent)] font-bold text-xs flex items-center justify-center shrink-0">
                        ۷۵٪
                    </div>
                </div>
            </section>

            {/* ردیف میانی: برنامه ورزشی امروز + باکس خالی برای چارت */}
            <section className="grid grid-cols-1 md:grid-cols-3 ">
                {/* برنامه ورزشی امروز */}
                <div className="lg:col-span-8 flex flex-col">
                    <h3 className="dash-heading text-base font-bold mb-3">
                        برنامه ورزشی امروز
                    </h3>
                    <div className="hero-panel rounded-2xl p-5 flex-1 flex items-center justify-between">
                        <div className="space-y-5">
                            <h4 className="font-extrabold text-lg">
                                تمرین هوازی و شکم
                            </h4>
                            <p className="dash-panel-muted text-xs leading-relaxed">
                                تمرین هوازی و چربی‌سوزی برای افزایش استقامت و فرم‌دهی
                            </p>
                            <button className="btn-primary text-xs font-bold px-5 py-2.5 rounded-xl">
                                شروع تمرین
                            </button>
                        </div>

                        {/* جایگاه تصویر کاراکتر ورزشی */}
                        <div className="w-24 h-28 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                            {/* تصویر کاراکتر خود را اینجا جایگزین کنید */}
                            <IconFlame size={40} stroke={1.5} />
                        </div>
                    </div>
                </div>

                {/* بخش چارت (خالی جهت قرار دادن کامپوننت چارت شما) */}
                <div className="lg:col-span-7 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="dash-heading text-base font-bold">
                            نمودار پیشرفت هفتگی
                        </h3>
                        <span className="dash-muted text-xs">کالری سوزی</span>
                    </div>
                    <div
                        id="chart-container"
                        className="dash-card rounded-2xl p-5 flex-1 min-h-[220px] flex items-center justify-center"
                    >
                        {/* کامپوننت چارت خود را اینجا اضافه کنید */}
                    </div>
                </div>
            </section>

            {/* ردیف پایین: کارت‌های توصیه روز */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="dash-card rounded-2xl p-5 space-y-2">
                    <h4 className="dash-heading font-bold text-base">توصیه روز</h4>
                    <p className="dash-muted text-xs md:text-sm leading-relaxed">
                        اهمیت نوشیدن آب و هیدراته نگه داشتن بدن قبل و بعد از تمرین را
                        فراموش نکنید تا ریکاوری عضلات سریع‌تر انجام شود.
                    </p>
                </div>

                <div className="dash-card rounded-2xl p-5 space-y-2">
                    <h4 className="dash-heading font-bold text-base">نکته تغذیه‌ای</h4>
                    <p className="dash-muted text-xs md:text-sm leading-relaxed">
                        مصرف پروتئین باکیفیت همراه با کربوهیدرات پیچیده تا ۴۵ دقیقه پس از
                        پایان تمرین به بازسازی ذخایر انرژی کمک می‌کند.
                    </p>
                </div>
            </section>
        </>
    )
}