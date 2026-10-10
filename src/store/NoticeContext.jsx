import { createContext, useContext, useEffect, useState } from 'react'
import Notification from '../components/Notification'

const NoticeContext = createContext(null)

export function NoticeProvider({ children }) {
  const [notice, setNotice] = useState(null)

  // Cada aviso empieza a salir a los 2,7 segundos y desaparece a los 3
  useEffect(() => {
    if (!notice) return
    const leaveTimer = setTimeout(() => {
      setNotice((current) => (current ? { ...current, leaving: true } : current))
    }, 2700)
    const removeTimer = setTimeout(() => setNotice(null), 3000)
    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(removeTimer)
    }
  }, [notice?.id])

  function notify(text, type = 'success') {
    setNotice({ id: Date.now(), text, type, leaving: false })
  }

  return (
    <NoticeContext.Provider value={{ notify }}>
      {children}
      {notice && (
        <div className={notice.leaving ? 'toast toast--leaving' : 'toast'} key={notice.id}>
          <Notification type={notice.type}>{notice.text}</Notification>
        </div>
      )}
    </NoticeContext.Provider>
  )
}

export function useNotice() {
  const context = useContext(NoticeContext)
  if (!context) {
    throw new Error('useNotice tiene que usarse dentro de NoticeProvider')
  }
  return context
}