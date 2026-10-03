import './TodayAlert.css'
import Icon from './Icon'

function TodayAlert({ type, children, onClick }) {
  if (type === 'clear') {
    return (
      <div className="today-alert today-alert--clear" role="status">
        <Icon name="check-circle" size={18} className="today-alert__icon" />
        <span className="today-alert__message">{children}</span>
      </div>
    )
  }

  return (
    <button type="button" className={`today-alert today-alert--${type}`} onClick={onClick}>
      <span className="today-alert__dot" />
      <span className="today-alert__message">{children}</span>
      <Icon name="arrows-button-right" className="today-alert__chevron" />
    </button>
  )
}

export default TodayAlert