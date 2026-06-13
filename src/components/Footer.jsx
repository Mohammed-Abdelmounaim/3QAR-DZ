import React from "react";

function Logo() {
    return <img src="/images/navBarLogo.png" alt="Platform logo" width="15%" className="ml:5 md:ml-10 w-[100px]" />
}

function Links() {
    return (
        <div className="flex flex-col gap-2 md:gap-4 mb-4 md:mb-0 mt-5" dir="rtl">
                    <a href="/" className="hover:underline">الصفحة الرئيسية</a>
                    <a href="/about" className="hover:underline">حول المنصة</a>
        </div>
    )
}

function Contact() {
    return (
        <div className="text-center md:text-right mb-4 md:mb-0 mt-5" dir="rtl">
                    <p className="p-1">3qar_dz@gmail.com</p>
                    <p className="p-1" dir="ltr">+213 798888508</p>
                    <p className="p-1">الجزائر العاصمة</p>
        </div>
    )
}

function Copyright() {
    return (
        <div className="text-sm text-gray-400 text-center mt-5 " dir="rtl">
                    © 2026 3qar_dz جميع الحقوق محفوظة.
        </div>
    )
}

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
                {/* Logo */}
                <Logo />
                
                {/* Quick links */}
                <Links />

                {/* Contact info */}
                <Contact />
            </div>
            <div className="w-[100%] text-center">
                {/* Copyright */}
                <hr className="text-gray-400 mt-2"/>
                <Copyright />
            </div>
        </footer>
)}
export default Footer;