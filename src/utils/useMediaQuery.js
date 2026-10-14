import { useEffect, useState } from 'react'

// ¿La pantalla cumple esta media query? Se actualiza si cambia el ancho
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const handleChange = (event) => setMatches(event.matches)
    media.addEventListener('change', handleChange)
    setMatches(media.matches)
    return () => media.removeEventListener('change', handleChange)
  }, [query])

  return matches
}