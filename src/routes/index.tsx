import { createFileRoute } from '@tanstack/react-router'
import { OklchPlayground } from '../components/OklchPlayground'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <OklchPlayground />
}