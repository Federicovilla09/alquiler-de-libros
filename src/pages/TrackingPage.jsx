import { useState } from 'react'
import { Link } from 'react-router'
import './TrackingPage.css'
import NavigationHeader from '../components/NavigationHeader'
import TagFilter from '../components/TagFilter'
import LoanCard from '../components/LoanCard'
import BottomNav from '../components/BottomNav'
import { loans } from '../data/loans'
import { useLibrary } from '../store/LibraryContext'

const FILTERS = [
  { id: 'all', label: 'Todos', states: ['overdue', 'due-today', 'reserved', 'on-track'] },
  { id: 'rented', label: 'Alquilados', states: ['overdue', 'due-today', 'on-track'] },
  { id: 'reserved', label: 'Reservas', states: ['reserved'] },
]

const SECTIONS = [
  { state: 'overdue', label: 'Atrasado', urgent: true },
  { state: 'due-today', label: 'Vence hoy' },
  { state: 'reserved', label: 'Reservas que se liberan hoy' },
  { state: 'on-track', label: 'Al día' },
]

function TrackingPage() {
  const [filterId, setFilterId] = useState('all')   
  const { getBook } = useLibrary()

  const activeFilter = FILTERS.find((f) => f.id === filterId)
  const visibleLoans = loans.filter((loan) => activeFilter.states.includes(loan.state))

  function countFor(filter) {
    return loans.filter((loan) => filter.states.includes(loan.state)).length
  }

  return (
    <main className="app">
      <NavigationHeader title="Seguimiento" />

      <div className="content tracking">
        <div className="tracking__filters">
          {FILTERS.map((filter) => (
            <TagFilter
              key={filter.id}
              selected={filter.id === filterId}
              onClick={() => setFilterId(filter.id)}
            >
              {filter.label} · {countFor(filter)}
            </TagFilter>
          ))}
        </div>

        {SECTIONS.map((section) => {
          const sectionLoans = visibleLoans.filter((loan) => loan.state === section.state)
          if (sectionLoans.length === 0) return null

          return (
            <section key={section.state} className="tracking__section">
              <h2 className={section.urgent ? 'tracking__label tracking__label--urgent' : 'tracking__label'}>
                {section.label}
              </h2>
              {sectionLoans.map((loan) => {
                const book = getBook(loan.bookId)
                return (
                  <Link key={loan.id} to={`/libros/${loan.bookId}`} className="tracking__link">
                    <LoanCard
                      state={loan.state}
                      title={book.title}
                      coverColor={book.coverColor}
                      who={loan.who}
                      progress={loan.progress}
                      status={loan.status}
                    />
                  </Link>
                )
              })}
            </section>
          )
        })}
      </div>

      <BottomNav />
    </main>
  )
}

export default TrackingPage