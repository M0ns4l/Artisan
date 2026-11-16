import { render } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { routes } from '../app/routes.tsx'
import { ThemeProvider } from '../hooks/useTheme.tsx'

export function renderApp(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  const utils = render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  )
  return { ...utils, router }
}
