"use client";

import Logo from "@/app/components/molecules/Logo/page";
import MenuButton from "@/app/components/molecules/MenuButton/page";
import { navItems } from "@/app/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./style.module.css";

const NavigationBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <Link href="/">
          <Logo />
        </Link>
        <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        <ul
          className={`${styles.navLinks} ${
            isMenuOpen ? styles.navLinksOpen : ""
          }`}
        >
          {navItems.map((item) => (
            <li key={item.href} className={styles.navLink}>
              <Link
                href={item.href}
                className={pathname === item.href ? styles.active : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
