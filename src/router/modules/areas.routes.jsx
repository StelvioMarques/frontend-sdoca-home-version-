import Areas from '@/features/areas/pages/index'
import NewArea from '@/features/areas/pages/new'
import EditArea from '@/features/areas/pages/edit'
// import ViewArea from '@/features/areas/pages/view'
import PermissionRoute from '../guards/PermissionRoute'

export const areaRoutes = [
  {
    path: 'areas',
    element: (
      <PermissionRoute permissions={['rh-post']}>
        <Areas />
      </PermissionRoute>
    ),
  },
  {
    path: 'areas/new',
    element: (
      <PermissionRoute permissions={['rh-post']}>
        <NewArea />
      </PermissionRoute>
    ),
  },
  {
    path: 'areas/edit/:id',
    element: (
      <PermissionRoute permissions={['rh-post']}>
        <EditArea />
      </PermissionRoute>
    ),
  },
  // {
  //   path: 'areas/:id',
  //   element: (
  //     <PermissionRoute permissions={['admin-post']}>
  //       <ViewArea />
  //     </PermissionRoute>
  //   ),
  // },
]
