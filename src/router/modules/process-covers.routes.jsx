import ProcessCovers from '@/features/process-cover/pages/index'
import NewProcessCover from '@/features/process-cover/pages/new'
import EditProcessCover from '@/features/process-cover/pages/edit'
// import ViewClassification from '@/features/classification/pages/view'
import PermissionRoute from '../guards/PermissionRoute'

export const processCoversRoutes = [
  {
    path: 'process-covers',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <ProcessCovers />
      </PermissionRoute>
    ),
  },
  {
    path: 'process-covers/new',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <NewProcessCover />
      </PermissionRoute>
    ),
  },
  {
    path: 'process-covers/edit/:id',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <EditProcessCover />
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
