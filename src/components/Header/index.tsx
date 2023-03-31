import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = () => {
  const { pathname } = useRouter();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          priority
          src="/assets/logo.svg"
          height={32}
          width={32}
          alt="Github logo"
          color="red"
        />
        <nav>
          <ul>
            <li>
              <Link
                className={pathname === "/" ? "border-b-2 navLink" : "navlink"}
                href="/"
              >
                Discovery
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <Link
              className={
                pathname === "/account" ? "border-b-2 navLink" : "navlink"
              }
              href="/account"
            >
              {user.displayName || user.email}
            </Link>
            <button className="navLink" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
