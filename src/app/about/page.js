function AboutNote(){
    return(
        <section className="p-5 w-[400px] border-2 border-blue-500 m-auto mb-[50px] rounded-xl shadow-xl">
            <p dir="rtl" className="text-lg text-center"><span className="font-bold text-xl">3QAR DZ </span>
                هي منصة إلكترونية متخصصة في
                 سوق العقارات بالجزائر،
                  أُنشئت لتقديم حل رقمي 
                   يُسهّل عملية البحث عن العقارات وعرضها. 
                   تهدف المنصة إلى ربط أصحاب العقارات
                    بالباحثين عنها في بيئة بسيطة وسهلة الاستخدام
                    ، مما يتيح للمستخدم العثور على العقار المناسب
                     أو عرض عقاره للبيع بكل سهولة وفعالية،
                      دون الحاجة إلى عناء التنقل أو 
                      إضاعة الوقت في البحث التقليدي.
            </p>
        </section>
    )
}

function About(){
    return(
        <main className="pt-[65px]">
            <h1 className="text-center mt-[20px] mb-[30px] font-bold text-2xl">حول المنصة</h1>
            <AboutNote />
        </main>
    )
}
export default About;