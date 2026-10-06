import './SummaryCard.css'

export function SummaryItem({ label, value }) {
  return (
    <div className="summary-item">
      <span className="summary-item__label">{label}</span>
      <span className="summary-item__value">{value}</span>
    </div>
  )
}

function SummaryCard({ children }) {
  return <div className="summary-card">{children}</div>
}

export default SummaryCard