import { useState } from 'react'
import { useNavigate } from 'react-router'
import './LoginPage.css'
import TextField from '../components/TextField'
import Button from '../components/Button'

function LoginPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const canSubmit = user.trim() !== '' && password !== ''

  function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit) return
    // En la Etapa 7, acá se va a verificar el ingreso con Supabase
    navigate('/')
  }

  return (
    <main className="login">
      <div className="login__screen">
        <img className="login__illustration" src="/illustrations/login.svg" alt="" />

        <div className="login__welcome">
          <h1 className="login__title">Hola Mica</h1>
          <p className="login__subtitle">Ingresá para gestionar tu biblioteca</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__fields">
            <TextField
              label="Usuario"
              placeholder="Micaela Unrein"
              icon="user-single"
              name="username"
              autoComplete="username"
              onChange={(event) => setUser(event.target.value)}
            />
            <TextField
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              name="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
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