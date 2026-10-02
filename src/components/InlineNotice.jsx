import './InlineNotice.css'
import Button from './Button'

function InlineNotice({ title, children, actionLabel, onAction }) {
  return (
    <div className="inline-notice" role="status">
      <div className="inline-notice__texts">
        <p className="inline-notice__title">{title}</p>
        <p className="inline-notice__body">{children}</p>
      </div>
      {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  )
}

export default InlineNotice