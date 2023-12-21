/* ---------------------Group---------------------- */
<div className="group block max-w-xs">
  <div className="flex items-center space-x-3">
    <svg className="h-6 w-6 stroke-sky-500 group-hover:stroke-white"></svg>
    <h3 className="font-semibold text-slate-900 group-hover:text-white text-sm ">
      New project
    </h3>
  </div>
</div>;

/* ---------------------Grid---------------------- */
<div className="grid grid-cols-6">
  <div className="col-span-1 bg-[var(--bgSoft)] p-5">
    <Sidebar />
  </div>
  <div className="col-span-5 p-5">
    <Navbar />
    {children}
  </div>
</div>;

/* --------------------- transition-all ---------------------- */
<div className="group-hover:scale-95 ease-in duration-500"></div>

/* --------------------- Calc ---------------------- */
<div className="h-[calc(100vh-95px)]"></div>