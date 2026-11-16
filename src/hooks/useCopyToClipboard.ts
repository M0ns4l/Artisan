import { useCallback, useEffect, useRef, useState } from 'react'

export type CopyState = 'idle' | 'copied' | 'error'

/** Copies text and exposes a short-lived status for accessible feedback. */
export function useCopyToClipboard(resetAfterMs = 2500) {
  const [state, setState] = useState<CopyState>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      clearTimeout(timer.current)
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable')
        await navigator.clipboard.writeText(text)
        setState('copied')
      } catch {
        setState('error')
      }
      timer.current = setTimeout(() => setState('idle'), resetAfterMs)
    },
    [resetAfterMs],
  )

  return { state, copy }
}
