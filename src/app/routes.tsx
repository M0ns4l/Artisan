/* eslint-disable react/only-export-components -- lazy route components live with the route table */
import { lazy } from 'react'
import type { RouteObject } from 'react-router'
import { HomePage } from '../pages/HomePage.tsx'
import { NotFoundPage } from '../pages/NotFoundPage.tsx'
import { RootLayout } from './RootLayout.tsx'

const AboutPage = lazy(() => import('../pages/AboutPage.tsx'))
const ProjectsPage = lazy(() => import('../pages/ProjectsPage.tsx'))
const ProjectDetailPage = lazy(() => import('../pages/ProjectDetailPage.tsx'))
const ExperiencePage = lazy(() => import('../pages/ExperiencePage.tsx'))
const ContactPage = lazy(() => import('../pages/ContactPage.tsx'))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:slug', element: <ProjectDetailPage /> },
      { path: 'experience', element: <ExperiencePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
