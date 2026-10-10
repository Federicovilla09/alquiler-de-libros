import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './HomeHeader.css'
import Icon from './Icon'
import TodayAlert from './TodayAlert'
import AccountMenu from './AccountMenu'

function formatToday() {
  const text = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const clean = text.replace(',', '')
  return clean.charAt(0).toUpperCase() + clean.slice(1)
}

function HomeHeader({ alerts = [], welcome = false }) {
  const [expanded, setExpanded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  // Al scrollear: sombra en el header y los pendientes se colapsan
  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY
      setScrolled(y > 0)
      if (y > 40) setExpanded(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const total = alerts.reduce((sum, alert) => sum + alert.count, 0)
  const overdue = alerts
    .filter((alert) => alert.type === 'overdue')
    .reduce((sum, alert) => sum + alert.count, 0)

  return (
    <div className="home-header-wrap">
      <header className={scrolled ? 'home-header home-header--scrolled' : 'home-header'}>
        <div className="home-header__top">
          <div className="home-header__greeting">
            <h1 className="home-header__hello">Hola, Mica</h1>
            <p className="home-header__date">{formatToday()}</p>
          </div>
          <AccountMenu />
        </div>

        {!welcome && (
          <div className="home-header__today">
            <p className="home-header__label">Para hoy</p>

            {/* State=Clear */}
            {alerts.length === 0 && (
              <TodayAlert type="clear">Todo al día. No hay vencimientos ni reservas pendientes.</TodayAlert>
            )}

            {/* State=Collapsed */}
            {alerts.length > 0 && !expanded && (
              <button
                type="button"
                className="today-summary"
                aria-expanded={false}
                onClick={() => setExpanded(true)}
              >
                <span className="today-summary__dots">
                  {alerts.map((alert) => (
                    <span key={alert.id} className={`today-summary__dot today-summary__dot--${alert.type}`} />
                  ))}
                </span>
                <span className="today-summary__text">
                  <strong>
                    {total} {total === 1 ? 'pendiente' : 'pendientes'}
                  </strong>
                  {overdue > 0 && (
                    <span className="today-summary__late">
                      · {overdue} {overdue === 1 ? 'atrasada' : 'atrasadas'}
                    </span>
                  )}
                </span>
                <Icon name="arrows-button-down" className="today-summary__chevron" />
              </button>
            )}

            {/* State=Pending */}
            {alerts.length > 0 && expanded && (
              <div className="home-header__alerts">
                {alerts.map((alert) => (
                  <TodayAlert key={alert.id} type={alert.type} onClick={() => navigate('/seguimiento')}>
                    {alert.message}
                  </TodayAlert>
                ))}
                <button
                  type="button"
                  className="today-hide"
                  aria-expanded={true}
                  onClick={() => setExpanded(false)}
                >
                  Ocultar pendientes
                  <Icon name="arrows-button-up" size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  )
}

export default HomeHeader