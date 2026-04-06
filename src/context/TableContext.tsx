import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

interface TableContextType {
  tableNumber: string
  setTableNumber: (n: string) => void
  hasTable: boolean
}

const TableContext = createContext<TableContextType | null>(null)

function getHashParams(): URLSearchParams {
  const hash = window.location.hash
  const queryPart = hash.includes('?') ? hash.split('?')[1] : ''
  return new URLSearchParams(queryPart)
}

function updateHashParams(key: string, value: string) {
  const hashPath = window.location.hash.split('?')[0] || '#/'
  const params = getHashParams()
  if (value.trim()) {
    params.set(key, value.trim())
  } else {
    params.delete(key)
  }
  const qs = params.toString()
  window.history.replaceState(null, '', qs ? `${hashPath}?${qs}` : hashPath)
}

export { updateHashParams }

export function TableProvider({ children }: { children: ReactNode }) {
  const [tableNumber, setTableNumberState] = useState('')

  const setTableNumber = useCallback((n: string) => {
    setTableNumberState(n)
    updateHashParams('mesa', n)
  }, [])

  // Read mesa param from URL on mount and watch for changes
  useEffect(() => {
    const readMesa = () => {
      const params = getHashParams()
      const mesa = params.get('mesa')
      if (mesa) {
        setTableNumberState(prev => prev !== mesa ? mesa : prev)
      }
    }
    readMesa()
    window.addEventListener('hashchange', readMesa)
    window.addEventListener('popstate', readMesa)
    // Poll for manual URL edits (hashchange doesn't fire for same-hash query changes)
    const interval = setInterval(readMesa, 1000)
    return () => {
      window.removeEventListener('hashchange', readMesa)
      window.removeEventListener('popstate', readMesa)
      clearInterval(interval)
    }
  }, [])

  return (
    <TableContext.Provider value={{ tableNumber, setTableNumber, hasTable: tableNumber.trim().length > 0 }}>
      {children}
    </TableContext.Provider>
  )
}

export function useTable() {
  const ctx = useContext(TableContext)
  if (!ctx) throw new Error('useTable must be used within TableProvider')
  return ctx
}
