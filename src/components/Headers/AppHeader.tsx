'use client'

import { RxDashboard } from "react-icons/rx";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/react";
import UserHeaderCard from "./UserHeaderCard";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { useWidth } from "@/providers/WidthProvider";
import CartHeaderDisplay from "./CartHeaderDisplay";
import KomasLogo from "./KomasLogo";

export default function AppHeader() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const { width } = useWidth()

  return (
    <Navbar
      as={'header'}
      shouldHideOnScroll={width < 768}
      isMenuOpen={isMobileNavOpen}
      onMenuOpenChange={setIsMobileNavOpen}
      isBlurred={width < 768}
      isBordered
      classNames={{
        base: "z-50",
        wrapper: "max-w-6xl",
        brand: 'gap-6'
      }}
    >
      <NavbarContent as='div'>
        <NavbarMenuToggle
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <div className="hidden md:flex gap-2 items-center  bg-[#3BB77E] text-white pr-6 pl-2 py-1 my-2 rounded-md">
            <div>
              <RxDashboard size={20} />
            </div>
            <div>
              <p className="text-md">Shopping Address</p>
              <p className="text-xs">Aladinma Owerre Imo</p>
            </div>
          </div>
          <KomasLogo />
          {/* <p className="font-bold text-inherit">ACME</p> */}
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        as='div'
        justify="end"
        className="gap-6 md:gap-10"
      >
        <CartHeaderDisplay />
        <UserHeaderCard />
      </NavbarContent>
      <MobileNav setIsOpen={setIsMobileNavOpen} />
    </Navbar>
  );
}
