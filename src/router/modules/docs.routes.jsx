import Documents from '@/features/documentos/pages/index'
import NewDocument from '@/features/documentos/pages/new'
import EditDocument from '@/features/documentos/pages/edit'
import ViewDocument from '@/features/documentos/pages/view'
import FinalizarDocument from '@/features/documentos/pages/finalizar'
import PermissionRoute from '../guards/PermissionRoute'

export const documentRoutes = [
  {
    path: 'documents',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <Documents />
      </PermissionRoute>
    ),
  },
  {
    path: 'documents/new',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <NewDocument />
      </PermissionRoute>
    ),
  },
  {
    path: 'documents/finalizar/:id',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <FinalizarDocument />
      </PermissionRoute>
    ),
  },
  {
    path: 'documents/edit/:id',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <EditDocument />
      </PermissionRoute>
    ),
  },
  {
    path: 'documents/:id',
    element: (
      <PermissionRoute permissions={['tecnico-post']}>
        <ViewDocument />
      </PermissionRoute>
    ),
  },
]
