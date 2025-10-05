import Archives from '@/features/archives/pages/index'
import NewArchive from '@/features/archives/pages/new'
import ViewArchive from '@/features/archives/pages/view'
import PermissionRoute from '../guards/PermissionRoute'

export const archiveRoutes = [
  {
    path: 'archives',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <Archives />
      </PermissionRoute>
    ),
  },
  {
    path: 'archives/new',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <NewArchive />
      </PermissionRoute>
    ),
  },
  {
    path: 'archives/:id',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <ViewArchive />
      </PermissionRoute>
    ),
  },
]
