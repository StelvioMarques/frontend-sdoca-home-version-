import Departamentos from '@/features/departamento/pages/index'
import NewDepartamentos from '@/features/departamento/pages/new'
import EditDepartamento from '@/features/departamento/pages/edit'
//import ViewDepartamento from '@/features/departaments/pages/view'
import PermissionRoute from '../guards/PermissionRoute'

export const departmentsRoutes = [
  {
    path: 'departments',
    element: (
      <PermissionRoute permissions={['rh-post']}>
        <Departamentos />
      </PermissionRoute>
    ),
  },
  {
    path: 'departments/new',
    element: (
      <PermissionRoute permissions={['rh-post']}>
        <NewDepartamentos />
      </PermissionRoute>
    ),
  },
  {
    path: 'departments/edit/:id',
    element: (
      <PermissionRoute permissions={['rh-post']}>
        <EditDepartamento />
      </PermissionRoute>
    ),
  },
/*   {
    path: 'departments/:id',
    element: (
      <PermissionRoute permissions={['admin-post']}>
        <ViewDepartamento />
      </PermissionRoute>
    ),
  }, */
]
