'use client'
import Link from "next/link";

import { IconUser, IconHome2, IconLogin, IconShoppingBag, IconLogout2, IconLayoutDashboard, IconTallymark4, IconBarbell } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from '@/src/components/ui/toggle-theme'


export default function Nav() {
    const login = false;
    return (
        <>
            {/* Navbar Pc Size */}
            <nav className="max-sm:hidden max-md:hidden navbarTop navbar-shell BYekan font-bold p-5 rounded-full">
                <div className="nav-content overflow-y-auto scroll-smooth text-xl">
                    <a href="#" className="max-sm:hidden ">
                        <span className="TextDarkG font-display font-extrabold text-3xl">
                            FitPro
                        </span>
                    </a>
                    <ul className="nav-links text-2xl" aria-hidden="true" >
                        <li className="max-sm:flex max-sm:flex-1">
                            <a href="#" className="navLink text-xl">صفحه اصلی</a>
                        </li>
                        <li className="max-sm:flex max-sm:flex-1">
                            <a href="#" className="navLink text-xl">دوره ها</a>
                        </li>
                        <li className="max-sm:flex max-sm:flex-1">
                            <a href="#" className="navLink text-xl">فیتنس</a>
                        </li>
                    </ul>
                    <div className="flexC  ">
                        {ModeToggle()}
                        <Button
                            aria-label="Cart, 5 items"
                            variant='outline'
                            className="nav-btn relative ml-1 p-1 size-13 mr-1 rounded-4xl"
                        >
                            <IconShoppingBag className=" size-8" />
                            <Badge className=" size-6 absolute top-0 left-0 bgDarkG TextWG" >5</Badge >
                        </Button>
                        {
                            login === true ? MenuLogin() :
                                <Button
                                    aria-label="Cart, 5 items"
                                    variant='outline'
                                    className="nav-btn relative ml-1 p-1 size-13 mr-1 rounded-4xl"
                                >
                                    <IconLogin className=" size-8 TextDarkG" />
                                </Button>
                        }
                    </div>
                </div>
            </nav>

            {/* NavPhoneSize */}
            <nav className="md:hidden navbarB navbar-shell p-5 rounded-full">
                <div className="nav-content overflow-y-auto scroll-smooth">
                    <ui className="nav-links TextDarkG flexC mx-auto"  >
                        <li className="max-sm:flex max-sm:flex-1 mx-1">
                            <Button variant='outline' className="nav-btn ml-1 p-1 size-15 rounded-4xl">
                                <a href="#">
                                    <IconHome2 className=" size-8" />
                                </a>
                            </Button>
                        </li>
                        <li className="max-sm:flex max-sm:flex-1 mx-1">
                            <Button variant='outline' className="nav-btn ml-1 p-1 size-15 rounded-4xl">
                                <a href="#">
                                    < IconBarbell className=" size-8" />
                                </a>
                            </Button>
                        </li>
                        <li className="max-sm:flex max-sm:flex-1 mx-1">
                            <Button
                                aria-label="Cart, 5 items"
                                size="icon-sm"
                                variant='outline'
                                className="nav-btn relative ml-1 p-1 size-15 rounded-4xl"
                            >
                                <IconShoppingBag className=" size-8" />
                                <Badge className="bgDarkG TextWG size-6 absolute top-0 left-0" >0</Badge >
                            </Button>
                        </li>
                        <li className="max-sm:flex max-sm:flex-1 mx-1">
                            {ModeToggle()}
                        </li>
                        <li className="max-sm:flex max-sm:flex-1 mx-1">
                            {
                                login === true ? MenuLogin() :
                                    <Link
                                        href='/login'
                                    >
                                        <Button
                                            aria-label="Cart, 5 items"
                                            size="icon-sm"
                                            variant='outline'
                                            className="nav-btn relative ml-1 p-1 size-15 rounded-4xl"
                                        >
                                            <IconLogin className=" size-8 TextDarkG" />
                                        </Button>
                                    </Link>
                            }
                        </li>
                    </ui>
                </div>
            </nav>
        </>
    );
}

// after login icon
export function MenuLogin() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant='outline' className="nav-btn max-sm:size-15 md:size-13 rounded-4xl"><IconUser className=" size-8" /></Button>
            } />
            <DropdownMenuContent className='nav-menu p-5 min-w-3xs max-sm:mb-5 md:mt-7 font-display'>
                <DropdownMenuItem className='nav-menu-item p-4 cursor-pointer flex justify-between'>
                    داشبورد
                    <IconLayoutDashboard className=" size-8" />
                </DropdownMenuItem >
                <DropdownMenuItem className='nav-menu-item p-4 cursor-pointer flex justify-between'>
                    برنامه های من
                    <IconTallymark4 className=" size-8" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="nav-menu-sep" />
                <DropdownMenuItem variant="destructive" className='nav-menu-item nav-menu-danger p-4 mt-2 cursor-pointer flex justify-between'>
                    خروج از حساب
                    <IconLogout2 className=" size-8" />
                </DropdownMenuItem >
            </DropdownMenuContent>
        </DropdownMenu>
    )
}




// <div className="flex justify-center fixed  w-full top-0 left-0 z-20  start-0">
//             <nav className="     w-full   backdrop-blur-[5px]  border-1  rounded-4xl m-5 " >