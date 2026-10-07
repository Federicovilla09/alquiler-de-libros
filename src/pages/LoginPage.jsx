import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import './LoginPage.css'
import TextField from '../components/TextField'
import Button from '../components/Button'
import Loader from '../components/Loader'
import { useAuth } from '../store/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Si ya hay una sesión iniciada, no tiene sentido mostrar el login
  if (session && !submitting) {
    return <Navigate to="/" replace />
  }

  const canSubmit = email.trim() !== '' && password !== ''

  async function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit) return

    setSubmitting(true)
    const error = await signIn(email.trim(), password)

    if (error) {
      setSubmitting(false)
      setLoginError('Email o contraseña incorrectos')
      return
    }

    navigate(location.state?.from ?? '/', { replace: true })
  }

  return (
    <main className="login">
      {submitting && <Loader label="Ingresando" />}

      <div className="login__screen" hidden={submitting}>
        <img className="login__illustration" src="/illustrations/login.svg" alt="" />

        <div className="login__welcome">
          <h1 className="login__title">Hola Mica</h1>
          <p className="login__subtitle">Ingresá para gestionar tu biblioteca</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__fields">
            <TextField
              label="Email"
              type="email"
              placeholder="tu@email.com"
              icon="user-single"
              name="email"
              autoComplete="username"
              inputMode="email"
              error={loginError ? true : undefined}
              onChange={(event) => {
                setEmail(event.target.value)
                setLoginError(null)
              }}
            />
            <TextField
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              name="password"
              autoComplete="current-password"
              error={loginError ?? undefined}
              onChange={(event) => {
                setPassword(event.target.value)
                setLoginError(null)
              }}
            />
          </div>
          <Button type="submit" disabled={!canSubmit}>
            Iniciar sesión
          </Button>
        </form>
      </div>
    </main>
  )
}

export default LoginPage