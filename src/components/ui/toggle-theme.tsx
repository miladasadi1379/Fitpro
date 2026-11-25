"use client"

import { IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme, } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // تا قبل از mount شدن، آیکون ثابت رندر می‌شود تا با HTML سرور یکی باشد
    const isDark = mounted && resolvedTheme === 'dark'

    return (
        <Button
            variant='ghost'
            aria-label={isDark ? 'حالت روشن' : 'حالت تیره'}
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="nav-btn size-9 md:size-13 rounded-4xl shrink-0">
            {mounted
                ? (isDark ? <IconSun className="size-5 md:size-8" /> : <IconMoon className="size-5 md:size-8" />)
                : <span className="size-5 md:size-8" aria-hidden="true" />}
        </Button>
    )
}
