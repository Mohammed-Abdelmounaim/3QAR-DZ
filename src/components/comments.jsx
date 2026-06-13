"use client";
import { useState, useEffect } from "react";

function Comments({ announceId, initcomments }){
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(initcomments);
    const [token, setToken] = useState(null);
    
    useEffect(() =>{
        setToken(localStorage.getItem("token"));
    },[])
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!comment.trim()) return;

        const res = await fetch("/api/comments/add",{
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
             },
            body: JSON.stringify(
                {
                    announceId,
                    comment
                }
            )
        });

        const data = await res.json();
        if (data.success) {
            setComments((prev) => [data.comment, ...prev]);
        }
    };

    return (
        <section className="w-[90%] bg-gray-100 rounded-xl shadow-xl m-auto mt-7 mb-[20px]">
            <h2 className="text-center text-2xl font-bold mt-[20px] mb-[40px]">التعليقات</h2>

            {token ? (
                <form onSubmit={handleSubmit} className="flex gap-3 justify-center mb-[30px] w-[90%] m-auto" dir="rtl">
                    <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="أضف تعليق" className="w-[70%] h-[40px] outline-2 outline-blue-200 focus:outline-blue-500 rounded-lg pr-[8px]" required/>
                    <button type="submit" className="w-[20%] h-[40px] flex justify-center items-center text-white text-lg rounded-lg bg-blue-500 h-[30px] hover:bg-blue-600 hover:cursor-pointer hover:transition hover:duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-left-icon lucide-arrow-big-left"><path d="M10.793 19.793a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707z"/></svg>
                    </button>
                </form>
            ) : (
                <p className="text-red-500 text-center font-bold text-lg mb-5">يجب تسجيل الدخول لإضافة تعليق</p>
            )}

            <div className="flex flex-col gap-4">
                
                {comments.length === 0 ? (
                    <p className="text-center text-gray-500 mt-3 mb-5">
                        لا توجد تعليقات بعد
                    </p>
                ) : (
                    comments.map((c, index) => (
                        <div key={index} className="border border-black rounded-lg p-4 w-[90%] m-auto mb-5" dir="rtl">

                            <div className="flex justify-between mb-2">

                                <p className="font-bold text-blue-500">
                                    {c.firstname} {c.lastname}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {new Date(c.created_at).toLocaleDateString()}
                                </p>

                            </div>

                            <p>{c.comment}</p>

                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
export default Comments;