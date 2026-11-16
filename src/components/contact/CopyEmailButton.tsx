import { Check, Copy, TriangleAlert } from 'lucide-react'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard.ts'
import { Button } from '../ui/Button.tsx'

export function CopyEmailButton({ email, size = 'md' }: { email: string; size?: 'md' | 'sm' }) {
  const { state, copy } = useCopyToClipboard()

  return (
    <>
      <Button variant="secondary" size={size} onClick={() => copy(email)}>
        {state === 'copied' ? (
          <Check size={16} aria-hidden="true" className="text-ok" />
        ) : state === 'error' ? (
          <TriangleAlert size={16} aria-hidden="true" className="text-warn" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {state === 'copied' ? 'Copied' : state === 'error' ? 'Copy failed' : 'Copy Email'}
      </Button>
      <output aria-live="polite" className="sr-only">
        {state === 'copied'
          ? 'Email address copied to clipboard.'
          : state === 'error'
            ? `Could not copy automatically. The email address is ${email}.`
            : ''}
      </output>
    </>
  )
}
