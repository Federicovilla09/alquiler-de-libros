import NavigationHeader from '../components/NavigationHeader'

function PlaceholderPage({ title, withNav = false }) {
  return (
    <main className="app">
      <NavigationHeader title={title} />
      <div className="content">
        <p className="placeholder">Esta pantalla se arma en los próximos pasos.</p>
      </div>
    </main>
  )
}

export default PlaceholderPage