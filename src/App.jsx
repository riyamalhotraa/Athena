import { Suspense } from 'react'
import AppRoutes from './routes/AppRoutes.jsx'
import LoadingSpinner from './components/ui/LoadingSpinner.jsx'

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-background">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <AppRoutes />
    </Suspense>
  )
}

export default App
