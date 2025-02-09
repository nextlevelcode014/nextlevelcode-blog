import { Card } from '@/components/card'
import { Header } from '@/components/header'
import Modal from '@/components/model'
import PostsList from '@/components/posts-list'
import { stylesComponets } from '@/styles'
import Link from 'next/link'
export const revalidate = 60 // Revalida os dados a cada 60 segundos

export default function Home() {
  return (
    <Modal>
      <Card>Home</Card>
    </Modal>
  )
}
