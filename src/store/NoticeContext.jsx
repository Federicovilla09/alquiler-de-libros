import { createContext, useContext, useEffect, useState } from 'react'
import Notification from '../components/Notification'

const NoticeContext = createContext(null)

export function NoticeProvider({ children }) {
  const [notice, setNotice] = useState(null)

  // Cada aviso desaparece solo a los 3 segundos
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 3000)
    return () => clearTimeout(timer)
  }, [notice])

  function notify(text, type = 'success') {
    setNotice({ id: Date.now(), text, type })
  }

  return (
    <NoticeContext.Provider value={{ notify }}>
      {children}
      {notice && (
        <div className="toast" key={notice.id}>
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