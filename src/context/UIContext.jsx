import { useState } from 'react'
import { UIContext } from './context'

export function UIProvider({ children }) {
  const [search, setSearch] = useState('')
  const [nav, setNav] = useState('tickets')
  return (
    <UIContext.Provider value={{ search, setSearch, nav, setNav }}>
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider
