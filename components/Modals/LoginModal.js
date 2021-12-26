import Modal from 'react-modal'
import { motion } from "framer-motion"
import styles from '../../styles/Nav.module.css'

export default function LoginModal({isOpen, setIsOpen, setIsSignupOpen}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className={styles.Modal}
      contentLabel="Example Modal"
      overlayClassName={styles.Overlay}
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
        <div className={styles.signupWrap}>
          <p>{`Don't have an account?`}</p>
          <motion.button 
            className={styles.loginActionBtn}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsSignupOpen(true);
              setIsOpen(false);
            }}
          >
            Signup
          </motion.button>
        </div>
      </div>
    </Modal>
  )
}