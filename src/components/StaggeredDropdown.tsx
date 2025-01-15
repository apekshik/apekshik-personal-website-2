"use client";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  name: string;
  href: string;
}

interface StaggeredDropdownProps {
  triggerText: string;
  items: DropdownItem[];
  onItemClick?: (item: DropdownItem) => void;
}

const StaggeredDropdown = ({ triggerText, items, onItemClick }: StaggeredDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div animate={open ? "open" : "closed"} className="relative">
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-6 py-2 font-bebas text-xl text-black hover:bg-gray-100 transition-colors"
      >
        <span>{triggerText}</span>
        <motion.span variants={iconVariants}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <motion.ul
        initial={wrapperVariants.closed}
        variants={wrapperVariants}
        style={{ originY: "top", translateX: "-50%" }}
        className="flex flex-col gap-1 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden border-2 border-black z-50"
      >
        {items.map((item, index) => (
          <Option 
            key={item.name} 
            item={item} 
            setOpen={setOpen} 
            onItemClick={onItemClick}
          />
        ))}
      </motion.ul>
    </motion.div>
  );
};

interface OptionProps {
  item: DropdownItem;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onItemClick?: (item: DropdownItem) => void;
}

const Option = ({ item, setOpen, onItemClick }: OptionProps) => {
  const handleClick = () => {
    setOpen(false);
    if (onItemClick) {
      onItemClick(item);
    } else if (item.href !== "#") {
      window.location.href = item.href;
    }
  };

  return (
    <motion.li
      variants={itemVariants}
      onClick={handleClick}
      className="flex items-center w-full p-2 text-lg font-bebas whitespace-nowrap rounded-md hover:bg-gray-100 text-black transition-colors cursor-pointer"
    >
      <span>{item.name}</span>
    </motion.li>
  );
};

export default StaggeredDropdown;

const wrapperVariants = {
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

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};