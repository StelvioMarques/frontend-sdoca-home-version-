import SettingsPage from '@/features/settings/pages/index'
import PermissionRoute from '../guards/PermissionRoute'

export const settingsRoutes = [
  {
    path: 'settings',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <SettingsPage />
      </PermissionRoute>
    ),
  },
]
