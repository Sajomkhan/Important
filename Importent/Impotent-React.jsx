
// ------------------Line breaking correct rendaring-----------------//

<p className="whitespace-pre-wrap">
     {services.desc}
 </p>


// ------------------Calculate the sum of the price values-----------------//
 const [items, setItems] = useState([
    { name: "Coffee", price: "6.55" },
    { name: "Movie", price: "20.00" },
    { name: "Candy", price: "4.55" },
  ]);
const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price), 0);


// ---------------Push array into another array-----------------------//
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
array1.push(...array2);
console.log(array1); // [1, 2, 3, 4, 5, 6]


  // ----------------Define a function to handle the key press event----------------//
  function handleKeyPress(e) {
    if (e.keyCode === 13) {
      myFunction();  // call back function
    }
  }
  document.addEventListener("keydown", handleKeyPress);


 // -----------------Active Link Example--------------------------//
import { usePathname } from "next/navigation";
  const pathname = usePathname();
  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    }];

<ul className="flex gap-4">
  {navItems.map((link, index) => (
   <li key={index}>
     <Link href={item.href} 
      className={`hover:bg-teal-400 ${ pathname === item.path ? "text-teal-400" : "" }`}
      >
       {link.label}
     </Link>
    </li>
   ))}
  </ul>


// ----------------- _util/Constants ------------//
export default {
 desc: "Lorem ipson"
}


// ----------------- find data from array of objects ------------//

export const users = [
    {id: "1", name: "Jone", email: "jone@test.com", password: "1234"},
    {id: "2", name: "James", email: "james@test.com", password: "1234"},
] 
const user = users.find((item) => item.email === credentials.email);
 if (user?.password === credentials.password) {
   return user;
 }


// ------------------------disabled button dynamically by pending state ------------//
const [pending, setPending] = useState(false);
  <button
    type="submit"
    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
    disabled={pending ? true : false}
  >
    {pending ? "Registering..." : "Register"}
  </button>


// ------------------------split and 'at' ------------//
  const pathname = "/about"
  console.log(pathname.split('/').at(1));   // output : about


// ------------------------split subsring' ------------//

<p className="text-sm">{services.desc.substring(0, 80)}...</p>


// ----------------- Suspension ------------//
 {post && (
     <Suspense fallback={<div>Loading...</div>}>
         <PostUser userId={post.userId} />
     </Suspense>
  )}


// ----------------- window scroll event ------------//

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const shouldAddClass = window.scrollY > 100; // Adjust the value as needed
      setIsScrolled(shouldAddClass);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 return (
    <main className="space-y-10 md:space-y-24">
      <Hero />
    </main>
  );
}
