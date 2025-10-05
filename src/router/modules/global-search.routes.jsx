import GlobalSearchPage from '@/features/global-search/pages/index'
import PermissionRoute from '../guards/PermissionRoute'

export const globalSearchRoutes = [
  {
    path: 'search',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <GlobalSearchPage />
      </PermissionRoute>
    ),
  },
]
