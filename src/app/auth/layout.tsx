// app/(auth)/layout.tsx
import styles from './auth.module.css'
import ActiveSegment from './active-segment'
import Provider from '@/services/provider'

export default async function AuthLayout({
  children,
  login,
  register,
}: {
  children: React.ReactNode
  login: React.ReactNode
  register: React.ReactNode
}) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Provider>
          <ActiveSegment register={register} login={login} />
          {children}
        </Provider>
      </div>
    </div>
  )
}
