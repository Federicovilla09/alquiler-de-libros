import './HistoryItem.css'

function HistoryItem({ who, price, copy, dates, status = 'on-time', statusText, renewed = false }) {
  return (
    <li className={`history-item history-item--${status}`}>
      <div className="history-item__rail" aria-hidden="true">
        <span className="history-item__dot" />
        <span className="history-item__line" />
      </div>
      <div className="history-item__card">
        {renewed && <span className="history-item__tag">Renovación</span>}
        <div className="history-item__header">
          <span className="history-item__who">{who}</span>
          <span className="history-item__price">{price}</span>
        </div>
        <p className="history-item__copy">{copy}</p>
        <p className="history-item__dates">{dates}</p>
        <p className="history-item__status">{statusText}</p>
      </div>
    </li>
  )
}

export default HistoryItem