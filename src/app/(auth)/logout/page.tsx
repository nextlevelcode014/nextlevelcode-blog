// app/(auth)/@logout/page.tsx
import styles from '../auth.module.css'

export default function LogoutPage() {
  return (
    <>
      <h1 className={styles.title}>Ready to Leave?</h1>
      <p className={styles.textCenter} style={{ marginBottom: '1.5rem' }}>
        Are you sure you want to sign out?
      </p>
      <form className={styles.form} action="/api/auth/sign-out" method="POST">
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonDanger}`}
        >
          Sign Out
        </button>
      </form>
    </>
  )
}
