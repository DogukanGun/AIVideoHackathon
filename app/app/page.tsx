export default function Home() {
  return (
    <section className="mb-8  lg:mx-auto lg:mt-20 flex flex-col justify-between gap-6 sm:gap-10 md:mb-16 md:gap-16 lg:flex-row">
      <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12">
        <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">Very proud to introduce</p>
        <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">Revolutionary Way of Real Estate Management</h1>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
          <a href="#" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Marketplace</a>
        </div>
      </div>
      <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-96 xl:w-5/12">
        <img src="https://images.unsplash.com/photo-1618556450991-2f1af64e8191?auto=format&q=75&fit=crop&w=1000" loading="lazy" alt="Photo by Fakurian Design" className="h-full w-full object-cover object-center" />
      </div>
    </section>
  )
}
