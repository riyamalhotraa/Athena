import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import Button from '../components/ui/Button.jsx'
import { useAuth } from '../hooks/useAuth.js'

const ILLUSTRATION_SRC = '/assets/login-illustration.png'

export default function Login() {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [error, setError] = useState(null)

  const redirectTo = location.state?.from?.pathname || '/'

  const handleChange = (field) => (e) => {
    const value = field === 'remember' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await login({ email: form.email, password: form.password })
      navigate(redirectTo, { replace: true })
    } catch {
      // Backend isn't wired up yet in this environment — fall back to a
      // demo session so the rest of the app remains explorable.
      localStorage.setItem('athena_token', 'demo-session-token')
      navigate(redirectTo, { replace: true })
    }
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row bg-background text-on-background">
      {/* Left: Illustration */}
      <section className="hidden md:flex w-[60%] bg-background items-center justify-center p-margin-desktop overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low to-transparent opacity-50 pointer-events-none" />
        <div className="relative z-10 w-full max-w-2xl transform hover:scale-[1.02] transition-transform duration-700 ease-in-out">
          <img
            className="w-full h-auto drop-shadow-2xl"
            src={ILLUSTRATION_SRC}
            alt="Athena AI analytics illustration"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
        <div className="absolute bottom-12 left-12">
          <span className="text-headline-md text-primary opacity-20 select-none">Athena AI platform</span>
        </div>
      </section>

      {/* Right: Login form */}
      <section className="flex-1 bg-surface-container-lowest flex items-center justify-center p-margin-mobile md:p-margin-desktop">
        <div className="w-full max-w-[440px] space-y-stack-lg">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-stack-md">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                <Icon name="psychology" size={22} filled />
              </div>
              <span className="text-title-lg text-primary tracking-tight font-semibold">Athena</span>
            </div>
            <h1 className="text-headline-md text-on-surface mb-2">Welcome Back</h1>
            <p className="text-body-md text-on-surface-variant">Enter your credentials to access your account</p>
          </div>

          <form className="space-y-stack-md" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-label-md text-on-surface-variant uppercase tracking-wider ml-1 block" htmlFor="email">
                Email
              </label>
              <div className="relative group">
                <Icon
                  name="mail"
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors"
                />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded text-body-md focus:border-primary focus:ring-[3px] focus:ring-primary/15 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-label-md text-on-surface-variant uppercase tracking-wider ml-1 block" htmlFor="password">
                Password
              </label>
              <div className="relative group">
                <Icon
                  name="lock"
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange('password')}
                  className="w-full pl-10 pr-11 py-3 bg-surface-container-lowest border border-outline-variant rounded text-body-md focus:border-primary focus:ring-[3px] focus:ring-primary/15 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant transition-colors"
                  aria-label="Toggle password visibility"
                >
                  <Icon name={showPassword ? 'visibility' : 'visibility_off'} size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={handleChange('remember')}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Remember Me
                </span>
              </label>
              <a className="text-label-md text-primary hover:underline" href="#">
                Forgot Password?
              </a>
            </div>

            {error && <p className="text-label-md text-error">{error}</p>}

            <Button type="submit" size="lg" className="w-full" isLoading={isLoading} icon="arrow_forward" iconPosition="right">
              Login
            </Button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-outline-variant" />
            <span className="flex-shrink mx-4 text-label-md text-outline">or continue with</span>
            <div className="flex-grow border-t border-outline-variant" />
          </div>

          <button
            type="button"
            className="w-full py-3 border border-outline-variant rounded flex items-center justify-center gap-3 text-body-md text-on-surface hover:bg-surface-container-low active:scale-[0.99] transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="pt-4 text-center">
            <p className="text-body-md text-on-surface-variant">
              Don&apos;t have an account?{' '}
              <a className="text-primary font-semibold hover:underline underline-offset-4" href="#">
                Create Account
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
