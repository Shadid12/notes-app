import Modal from 'react-modal'
import { motion } from "framer-motion"
import styles from '../../styles/Nav.module.css'

export default function SignupModal({isOpen, setIsOpen, setIsLoginOpen}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className={`${styles.Modal}`}
      style={{ height: '800px' }}
      contentLabel="Example Modal"
    >
      <button className={styles.closeCrossBtn} onClick={() => setIsOpen(false)}>X</button>
      <div className={styles.loginContainer}>
      <input className={styles.inputLogin} placeholder="Username"/>
        <input className={`${styles.inputLogin} ${styles.loginPassword}`} placeholder="Email"/>
        <input className={`${styles.inputLogin} ${styles.loginPassword}`} placeholder="Pasword"/>
        <motion.button 
          className={styles.loginActionBtn}
          whileTap={{ scale: 0.9 }}
        >
          Signup
        </motion.button>
        <div className={styles.signupWrap}>
          <p>{`Already have an account?`}</p>
          <motion.button 
            className={styles.loginActionBtn}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsLoginOpen(true);
              setIsOpen(false);
            }}
          >
            Login
          </motion.button>
        </div>
      </div>
    </Modal>
  )
}