import Modal from 'react-modal'
import { motion } from "framer-motion"
import styles from '../../styles/Nav.module.css'
import { useState } from 'react'
import { UserRegistration } from '../../fql/User'

export default function SignupModal({isOpen, setIsOpen, setIsLoginOpen}) {
  const [state, setState] = useState({
    username: '',
    password: '',
    email: '',
  })

  const handleChange = (e) => { 
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const submitForm = (e) => {
    e.preventDefault()
    UserRegistration(state.username, state.email, state.password)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className={`${styles.Modal}`}
      style={{ height: '800px' }}
      contentLabel="Example Modal"
      overlayClassName={styles.Overlay}
    >
      <button className={styles.closeCrossBtn} onClick={() => setIsOpen(false)}>X</button>
      <div className={styles.loginContainer}>
      
      <input 
        className={styles.inputLogin} 
        placeholder="Username"
        name="username"
        onChange={handleChange}
      />
      <input 
        className={`${styles.inputLogin} ${styles.loginPassword}`} 
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input 
        className={`${styles.inputLogin} ${styles.loginPassword}`} 
        placeholder="Pasword"
        name="password"
        onChange={handleChange}
        type="password"
      />

        <motion.button 
          className={styles.loginActionBtn}
          whileTap={{ scale: 0.9 }}
          onClick={submitForm}
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