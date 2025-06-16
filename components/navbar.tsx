"use client";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { FiMenu, FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Community", href: "/Community" },
  { label: "Write", href: "/createBlog" },
  { label: "FAQ", href: "/FAQ" },
  { label: "Support", href: "/Support" },
  { label: "Log In", href: "/login" },
];

const FlipNavWrapper = () => {
  return (
    <div className="bg-[var(--paper)]">
      <FlipNav />
    </div>
  );
};

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-[var(--paper-raised)] p-4 border-b border-[var(--line)] flex items-center justify-between relative font-sans">
      <NavLeft setIsOpen={setIsOpen} />
      <NavRight />
      <NavMenu isOpen={isOpen} />
    </nav>
  );
};

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      src="/Blogs4u.png"
      alt="Logo"
      width={100}
      height={100}
      className="cursor-pointer"
    />
  );
};

const NavLeft = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="block lg:hidden text-[var(--ink)] text-2xl"
        onClick={() => setIsOpen((pv) => !pv)}
      >
        <FiMenu />
      </motion.button>
      <Logo />
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.href} text={item.label} href={item.href} />
      ))}
    </div>
  );
};

const NavLink = ({ text, href }: { text: string; href: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className="cursor-pointer hidden lg:block h-[30px] overflow-hidden font-medium text-sm tracking-wide"
    >
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-[var(--ink-soft)]">
          {text}
        </span>
        <span className="flex items-center h-[30px] text-[var(--accent-teal)]">
          {text}
        </span>
      </motion.div>
    </div>
  );
};

const NavRight = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/createBlog")}
        className="px-4 py-2 bg-[var(--accent-teal)] text-[var(--paper-raised)] font-medium rounded-sm hover:opacity-90 transition-opacity duration-200 whitespace-nowrap text-sm"
      >
        Write a Post
      </motion.button>
    </div>
  );
};

const NavMenu = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute p-4 bg-[var(--paper-raised)] shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4 border-b border-[var(--line)]"
    >
      {NAV_ITEMS.map((item) => (
        <MenuLink key={item.href} text={item.label} href={item.href} />
      ))}
    </motion.div>
  );
};

const MenuLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <motion.a
      variants={menuLinkVariants}
      href={href}
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
    >
      <motion.span variants={menuLinkArrowVariants}>
        <FiArrowRight className="h-[30px] text-[var(--ink)]" />
      </motion.span>
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-[var(--ink-soft)]">
          {text}
        </span>
        <span className="flex items-center h-[30px] text-[var(--ink)]">
          {text}
        </span>
      </motion.div>
    </motion.a>
  );
};

export default FlipNavWrapper;

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};
