import Drawers from '@/features/drawer/pages/index'
import NewDrawer from '@/features/drawer/pages/new'
import EditDrawer from '@/features/drawer/pages/edit'
// import ViewClassification from '@/features/classification/pages/view'
import PermissionRoute from '../guards/PermissionRoute'

export const drawersRoutes = [
  {
    path: 'drawers',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <Drawers />
      </PermissionRoute>
    ),
  },
  {
    path: 'drawers/new',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <NewDrawer />
      </PermissionRoute>
    ),
  },
  {
    path: 'drawers/edit/:id',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <EditDrawer />
      </PermissionRoute>
    ),
  },
  // {
  //   path: 'classifications/:id',
  //   element: (
  //     <PermissionRoute permissions={['admin-post']}>
  //       <ViewClassification />
  //     </PermissionRoute>
  //   ),
  // },
]
