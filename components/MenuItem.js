import * as React from "react";
import { motion } from "framer-motion";
import styles from "../styles/Nav.module.css";
import Image from 'next/image'

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i }) => {
  const style = { border: `2px solid ${colors[i]}` };
  let itemDetails = {}
  switch (i) { 
    case 0:
      itemDetails = { 
        title: "New",
        icon: <Image src="/draft.png" alt="me" width="64" height="64" />
      }
      break;
    case 1:
      itemDetails = { 
        title: "Share",
        icon: <Image src="/share.png" alt="me" width="64" height="64" />
      }
      break;

  }
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={
        () => console.log(`Clicked ${i}`)
      }
    >
      <div className={styles.iconPlaceholder} >
        {itemDetails.icon}
      </div>
      <div className={styles.textPlaceholder} >
        {itemDetails.title}
      </div>
    </motion.li>
  );
};
