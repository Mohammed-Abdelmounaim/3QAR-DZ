"use client";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import Link from "next/link";
import { useState } from "react";

function Logo() {
    return <img src="/images/navBarLogo.png" alt="Platform logo" width="15%" className="ml:5 md:ml-10 w-[100px]" />
}

function Form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if(data.success) {
            localStorage.setItem("token", data.token);
            router.push("/");
        } else {
            setError(data.message);
        }

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-[450px] h-[550px] mb-[60px] m-auto pt-10 shadow-xl rounded-lg">
            <div className="flex w-[90%] justify-between">
                <Logo />
                <h1 className="text-center w-[50%] p-3 font-bold text-3xl text-blue-500">تسجيل الدخول</h1>
            </div>
            <div className="w-[90%] m-auto">
                <hr className="text-blue-500 border-1"/>
            </div>
            <div className="w-[90%] flex flex-col gap-2 mb-[40px]" dir="rtl">

                <label htmlFor="email" className="font-bold text-lg mr-[50px]">البريد الإلكتروني</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-[90%] h-[50px] m-auto focus:outline-none pr-3 border border-gray-300 rounded-lg mt-[5px] mb-[20px] focus:ring ring-blue-500" type="email" placeholder="أدخل بريدك الإلكتروني" id="email" required/>

                <label htmlFor="pass" className="font-bold text-lg mr-[50px]">كلمة المرور</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-[90%] h-[50px] m-auto focus:outline-none pr-3 border border-gray-300 rounded-lg mt-[5px] mb-[20px] focus:ring ring-blue-500" type="password" placeholder="أدخل كلمة المرور" id="pass" required/>
                
            </div>

            <div className="w-[90%] flex flex-col pl-3 pr-3">
                {error && (
                    <p className="text-red-500 text-center mb-3 font-semibold">
                        {error}
                    </p>
                )}
                <button type="submit" className="w-[90%] m-auto mb-[10px] bg-blue-500 text-white h-[50px] text-center rounded-lg p-2 hover:bg-blue-600 hover:cursor-pointer text-xl font-bold shadow-lg hover:shadow-xl hover:transition hover:duration-300">تسجيل الدخول</button>
                <Link href="/signup" className="w-[90%] m-auto h-[40px] text-center p-2 text-lg text-blue-500 font-bold mb-[20px]">ليس لديك حساب ؟ أنشئ واحدا الأن</Link>
            </div>
        </form>
    )
}

function Home() {
    return (
        <main className="pt-[65px]">
            <Form />
        </main>
    )
}
export default Home;