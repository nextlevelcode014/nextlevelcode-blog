import UnderConstruction from '@/components/error-componets/under-construction'
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
  return <UnderConstruction />
}
