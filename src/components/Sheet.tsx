import { useEffect, useRef, type ReactNode, type TouchEvent } from 'react'
import { createPortal } from 'react-dom'
import { useI18n } from '../i18n'
import { IconClose } from './Icons'

interface Props {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  /** Scrolls the sheet back to the top whenever this value changes. */
  resetKey?: string
}

/** Distance from the top of the sheet (px) where a downward drag closes it. */
const DRAG_ZONE = 72
const CLOSE_DISTANCE = 110

/** Bottom sheet dialog. Closes on backdrop tap, Escape or dragging the handle down. */
export function Sheet({ open, onClose, title, children, resetKey }: Props) {
  const { ui } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const startY = useRef<number | null>(null)
  // Keep the latest onClose without re-running the open effect (which would steal focus from inputs).
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCloseRef.current()
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.focus({ preventScroll: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 })
  }, [resetKey])

  if (!open) return null

  const onTouchStart = (e: TouchEvent) => {
    const el = ref.current
    if (!el || el.scrollTop > 0) return
    const y = e.touches[0].clientY
    if (y - el.getBoundingClientRect().top < DRAG_ZONE) startY.current = y
  }
  const onTouchMove = (e: TouchEvent) => {
    if (startY.current == null || !ref.current) return
    const dy = e.touches[0].clientY - startY.current
    if (dy > 0) ref.current.style.transform = `translate(-50%, ${dy}px)`
  }
  const onTouchEnd = (e: TouchEvent) => {
    if (startY.current == null || !ref.current) return
    const dy = e.changedTouches[0].clientY - startY.current
    startY.current = null
    ref.current.style.transform = ''
    if (dy > CLOSE_DISTANCE) onClose()
  }

  return createPortal(
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={ref}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="sheet-handle" />
        {title && (
          <div className="sheet-head">
            <h2>{title}</h2>
            <button className="icon-btn" onClick={onClose} aria-label={ui.common.close}>
              <IconClose />
            </button>
          </div>
        )}
        {children}
      </div>
    </>,
    document.body,
  )
}
