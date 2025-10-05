import Cabinets from '@/features/cabinet/pages/index'
import NewCabinet from '@/features/cabinet/pages/new'
import EditCabinet from '@/features/cabinet/pages/edit'
// import ViewClassification from '@/features/classification/pages/view'
import PermissionRoute from '../guards/PermissionRoute'

export const cabinetsRoutes = [
	{
		path: 'cabinets',
		element: (
			<PermissionRoute permissions={['tecnico-post']}>
				<Cabinets />
			</PermissionRoute>
		),
	},
	{
		path: 'cabinets/new',
		element: (
			<PermissionRoute permissions={['tecnico-post']}>
				<NewCabinet />
			</PermissionRoute>
		),
	},
	{
		path: 'cabinets/edit/:id',
		element: (
			<PermissionRoute permissions={['tecnico-post']}>
				<EditCabinet />
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
