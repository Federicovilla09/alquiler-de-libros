import './StatusIndicator.css'

function StatusIndicator({ type = 'neutral', showDot = true, children }) {
  return (
    <span className={`status-indicator status-indicator--${type}`}>
      {showDot && <span className="status-indicator__dot" />}
      {children}
    </span>
  )
}

export default StatusIndicator