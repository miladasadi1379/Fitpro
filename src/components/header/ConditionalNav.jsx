"use client";

import { usePathname } from "next/navigation";
import Nav from "../header/Navbar";

export function ConditionalNav() {
    const pathname = usePathname();

    if (pathname !== "/") {
        return null;
    }
    return <Nav />;
}
