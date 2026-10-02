import './Notification.css'
import Icon from './Icon'

const NOTIFICATION_ICONS = {
  success: 'check-circle',
  error: 'alert-warning-circle',
}

function Notification({ type = 'success', showIcon = true, children }) {
  return (
    <div
      className={`notification notification--${type}`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      {showIcon && <Icon name={NOTIFICATION_ICONS[type]} className="notification__icon" />}
      <span>{children}</span>
    </div>
  )
}

export default Notification