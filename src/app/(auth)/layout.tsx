// app/(auth)/layout.tsx
import styles from './auth.module.css'

export default async function AuthLayout({
  children,
  login,
  register,
  params,
}: {
  children: React.ReactNode
  login: React.ReactNode
  register: React.ReactNode
  params: Promise<{ auth: string }>
}) {
  const sla = (await params).auth
  console.log(sla)
  const session = true

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {session ? register : login}
        {children}
      </div>
    </div>
  )
}
