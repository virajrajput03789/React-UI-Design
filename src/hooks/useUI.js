import { useContext } from 'react'
import { UIContext } from '../context/context'

export function useUI() {
  return useContext(UIContext)
}
