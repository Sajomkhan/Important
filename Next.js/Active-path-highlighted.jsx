"use client";
import Link from "next/link";
import { menuItems } from "@/app/data";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div>
      <ul>
        {menuItems.map((cat) => (
            <Link
              key={item.title}
              href={item.path}
              className={`flex gap-2  ${pathname === item.path ? "bg-[var(--bgHover)]" : "" }`}   // active path highlighted
            >
              <span>{item.title}</span>
            </Link>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
