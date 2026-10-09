import { useCallback, useRef, useState } from 'react'

export interface ToastState {
  message: string
  undo?: () => void
}

export type ShowToast = (message: string, undo?: () => void) => void

const DURATION_MS = 4500

/** Toast state with auto-hide. Returns [current toast, show, hide]. */
export function useToast(): [ToastState | null, ShowToast, () => void] {
  const [toast, setToast] = useState<ToastState | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const show = useCallback<ShowToast>((message, undo) => {
    clearTimeout(timer.current)
    setToast({ message, undo })
    timer.current = setTimeout(() => setToast(null), DURATION_MS)
  }, [])

  const hide = useCallback(() => setToast(null), [])
  return [toast, show, hide]
}
