import './LoanCard.css'

function LoanCard({ state = 'on-track', title, who, progress = 0, status, coverSrc, coverColor }) {
  const percent = Math.min(Math.max(progress, 0), 1) * 100

  return (
    <article className={`loan-card loan-card--${state}`}>
      <div className="loan-card__cover" style={{ backgroundColor: coverColor }}>
        {coverSrc && <img src={coverSrc} alt="" />}
      </div>
      <div className="loan-card__body">
        <h3 className="loan-card__title">{title}</h3>
        <p className="loan-card__who">{who}</p>
        <div className="loan-card__progress" aria-hidden="true">
          <div className="loan-card__bar" style={{ width: `${percent}%` }} />
        </div>
        <p className="loan-card__status">{status}</p>
      </div>
    </article>
  )
}

export default LoanCard