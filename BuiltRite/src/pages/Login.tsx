// src/pages/Login.tsx
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../state/useAuth'
import { useNavigate } from 'react-router-dom'
import './Login.css' 

export default function LoginPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (user) {
    navigate('/app')
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        navigate('/app')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate('/app')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-shell">
      <div className="login-brand">
        <img src="/images/BRSS_logo.png" alt="Logo" className="login-logo" />
      </div>

      <div className="login-card">
        <h1 className="login-title">
          {mode === 'signin' ? 'Sign in' : 'Create your account'}
        </h1>
        <p className="login-subtitle">
          {mode === 'signin'
            ? 'Enter your credentials to access the configurator.'
            : 'Use your email to get started.'}
        </p>

        <form className="login-form" onSubmit={onSubmit}>
          <label className="login-label">
            Email
            <input
              className="login-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </label>

          <label className="login-label">
            Password
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? 'Working…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <button
          type="button"
          className="login-secondary"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
        >
          {mode === 'signin'
            ? "Don't have an account? Create one"
            : 'Already have an account? Sign in'}
        </button>
      </div>

      <div className="login-footer">© {new Date().getFullYear()} BuiltRite Configurator</div>
    </div>
  )
}

