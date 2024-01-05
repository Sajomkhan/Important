
// ====================== app/page.jsx =====================//
<html lang="en">
<body className={inter.className}>
  <div className="fixed top-0 w-full z-50">
    <Navbar />
  </div>
  <div className="hidden fixed top-16 laft-0 z-40 w-72 lg:block">
    <SideMenu />
  </div>
  <div className="hidden fixed top-16 right-0 z-40 w-72 2xl:block">
    <SideMenu />
  </div>
  <main className="flex mx-auto mt-20 px-4 sm:px-12 md:px-20 lg:px-14 lg:ml-72 2xl:mr-72 ">
    {children}
  </main>
</body>
</html>