
// ------------------Grid System & uses var----------------------//

        <form className="grid grid-cols-6 gap-4 mb-5 text-[var(--textLight)]">
          <input
            className="col-span-3 p-2 border"
            type="text"
            placeholder="Enter Item"
          />
          <input
            className="col-span-2 p-2 border"
            type="text"
            placeholder="Enter $"
          />
          <button className="bg-gray-900 hover:bg-gray-950 p-2" type="submit">
            +
          </button>
        </form>

// -----------------image background -------------- //
                
        <div className='h-screen w-screen bg-cover bg-center bg-[url("/image/hero.png")]'>        // image location:  public/image/hero
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ">
            {children}
          </div>
        </div>

// -----------------image background with overlay -------------- //
                
    <div className="relative">
      <Image
        className="w-full h-[540px] absolute -z-20 object-cover object-center"
        src="/image/hero.png"
        width={1200}
        height={800}
        alt="Hero Image"
      />
      <div className="w-full h-[540px] absolute -z-10 bg-teal-100/70" />
    </div>
