"use client";
import Link from "next/link";
import { useState,useEffect } from "react";
import { usePathname } from "next/navigation";

function Logo() {
    return <img src="/images/navBarLogo.png" alt="Platform logo" width="10%" className="ml:5 md:ml-10 w-[100px]" />
}

const links = [
    { id:1, name: "الصفحة الرئيسية", href: "/" },
    { id:2, name: "حول", href: "/about" }
];

function NavBar() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <nav className = "bg-white fixed z-50 w-full shadow-lg">
            <div className="flex justify-between">
                {/* logo */}
                <Logo />

                {/* nav links */}
                <div className="hidden md:flex items-center space-x-10">
                    {links.map((link) => (
                        <Link key={link.id} className="hover:text-blue-500 text-lg" href={link.href}>
                            {link.name}
                        </Link>
                    ))}
                    <Link href={isLoggedIn ? "/profile" : "/login"} className="bg-blue-500 text-white w-[150px] h-[40px] text-center rounded-lg p-2 md:mr-10 ml-[100px] hover:bg-blue-600 text-lg">{isLoggedIn ? "الملف الشخصي" : "تسجيل الدخول"}</Link>
                </div>
                

                {/* small screen */}
                <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            {/* mobile menu */}
            { mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg rounded-b-lg px-2 pt-2 min-h-[180px] z-50">
                    {links.map((link) => (
                        <Link key={links.name} className="block bg-gray-100 p-3 m-2 hover:text-blue-500 hover:bg-gray-200 rounded-lg text-lg" dir="rtl" href={link.href}>
                            {link.name}
                        </Link>
                    ))}
                    <Link href={isLoggedIn ? "/profile" : "/login"} className="bg-blue-500 block h-[50px] text-center rounded-lg p-3 mt-5 text-white hover:bg-blue-600 text-lg mb-[15px]">{isLoggedIn ? "الملف الشخصي" : "تسجيل الدخول"}</Link>
                </div>
            ) 
            }
        </nav>
    )
}
export default NavBar;