import { useCallback, useEffect, useState } from 'react'
import { parseHash, toHash, type LearnSection, type Navigate, type Route } from '../navigation'

/** Current route from location.hash, plus a navigate function that updates it. */
export function useHashRoute(): [Route, Navigate] {
  const [route, setRoute] = useState(() => parseHash(location.hash))

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback<Navigate>((tab, section?: LearnSection) => {
    const hash = toHash(tab, section ?? parseHash(location.hash).section)
    if (location.hash !== hash) location.hash = hash
    else setRoute(parseHash(hash))
    window.scrollTo({ top: 0 })
  }, [])

  return [route, navigate]
}
