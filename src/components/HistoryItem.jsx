import './HistoryItem.css'

function HistoryItem({ who, price, copy, dates, status, current = false }) {
  return (
    <li className={current ? 'history-item history-item--current' : 'history-item'}>
      <div className="history-item__rail" aria-hidden="true">
        <span className="history-item__dot" />
        <span className="history-item__line" />
      </div>
      <div className="history-item__card">
        <div className="history-item__header">
          <span className="history-item__who">{who}</span>
          <span className="history-item__price">{price}</span>
        </div>
        <p className="history-item__copy">{copy}</p>
        <p className="history-item__dates">{dates}</p>
        <p className="history-item__status">{status}</p>
      </div>
    </li>
  )
}

export default HistoryItem