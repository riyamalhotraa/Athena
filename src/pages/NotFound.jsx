import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-6">
      <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
        <Icon name="search_off" size={40} />
      </div>
      <h1 className="text-headline-lg text-on-surface mb-2">404 — Page not found</h1>
      <p className="text-body-lg text-on-surface-variant mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link to="/">
        <Button variant="primary" icon="home">
          Back to Dashboard
        </Button>
      </Link>
    </div>
  )
}
