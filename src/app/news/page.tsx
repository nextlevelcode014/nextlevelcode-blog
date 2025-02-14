import { Card } from '@/components/card'
import ProtectedRoute from '@/components/protected-route'

export default function News() {
  return (
    <ProtectedRoute>
      <h1>News</h1>
    </ProtectedRoute>
  )
}
