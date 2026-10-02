import { useState } from 'react'
import './Tabs.css'

function Tabs({ tabs, defaultIndex = 0, onChange }) {
  const [active, setActive] = useState(defaultIndex)

  function select(index) {
    setActive(index)
    if (onChange) onChange(index)
  }

  return (
    <div className="tabs" role="tablist">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={index === active}
          className={index === active ? 'tabs__tab tabs__tab--active' : 'tabs__tab'}
          onClick={() => select(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default Tabs