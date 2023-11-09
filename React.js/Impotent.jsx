
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
      className={ pathname === `${item.href}` ? "text-blue-700 underline" : "" }>
       {link.label}
     </Link>
    </li>
   ))}
  </ul>
