import { useState } from "react"
import { motion } from "framer-motion"
import Modal from 'react-modal'
import styles from '../styles/Nav.module.css'

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <motion.button 
        className={styles.buttonLogin}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
      >
        Login
      </motion.button>
      <button onClick={toggle} className={styles.button}>
        <svg width="23" height="23" viewBox="0 0 23 23">
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" }
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" }
            }}
          />
        </svg>
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={styles.Modal}
        contentLabel="Example Modal"
      >
        <button className={styles.closeCrossBtn} onClick={() => setIsOpen(false)}>X</button>
        <div className={styles.loginContainer}>
          <input className={styles.inputLogin} placeholder="Username"/>
          <input className={`${styles.inputLogin} ${styles.loginPassword}`} placeholder="Pasword"/>
          <motion.button 
            className={styles.loginActionBtn}
            whileTap={{ scale: 0.9 }}
          >
            Login
          </motion.button>
        </div>
      </Modal>

    </div>
  )
};
