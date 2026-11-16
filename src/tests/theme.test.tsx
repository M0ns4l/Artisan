import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from './renderApp.tsx'

describe('theme toggle', () => {
  it('defaults to light and toggles to dark, persisting the choice', async () => {
    const user = userEvent.setup()
    renderApp('/')
    const root = document.documentElement
    expect(root).not.toHaveClass('dark')

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }))
    expect(root).toHaveClass('dark')
    expect(root.style.colorScheme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    await user.click(screen.getByRole('button', { name: 'Switch to light theme' }))
    expect(root).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('reads the theme already applied by the pre-paint script', () => {
    document.documentElement.className = 'dark'
    renderApp('/')
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })
})
