import Organization from '@/features/organization/pages/index'
import NewOrganization from '@/features/organization/pages/new'
import EditOrganization from '@/features/organization/pages/edit'
import ViewOrganization from '@/features/organization/pages/view'
import PermissionRoute from '../guards/PermissionRoute'

export const orgRoutes = [
  {
    path: 'organizations',
    element: (
      <PermissionRoute permissions={['rh-post']}>
        <Organization />
      </PermissionRoute>
    ),
  },
  {
    path: 'organization/new',
    element: (
      <PermissionRoute permissions={['rh-post']}>
        <NewOrganization />
      </PermissionRoute>
    ),
  },
  {
    path: 'organization/edit/:id',
    element: (
      <PermissionRoute permissions={['rh-post']}>
        <EditOrganization />
      </PermissionRoute>
    ),
  },
  {
    path: 'organization/:id',
    element: (
      <PermissionRoute permissions={['rh-post']}>
        <ViewOrganization />
      </PermissionRoute>
    ),
  },
]
