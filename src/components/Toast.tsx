import type { ToastState } from '../hooks/useToast'
import { useI18n } from '../i18n'

export function Toast({ toast, onHide }: { toast: ToastState | null; onHide: () => void }) {
  const { ui } = useI18n()
  if (!toast) return null
  return (
    <div className="toast" role="status">
      {toast.message}
      {toast.undo && (
        <button
          onClick={() => {
            toast.undo?.()
            onHide()
          }}
        >
          {ui.common.undo}
        </button>
      )}
    </div>
  )
}
