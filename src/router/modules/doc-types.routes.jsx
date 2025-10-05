import DocTypes from '@/features/doc-type/pages/index'
import NewDocType from '@/features/doc-type/pages/new'
import EditDocType from '@/features/doc-type/pages/edit'
// import ViewDocType from '@/features/doc-type/pages/view'
import PermissionRoute from '../guards/PermissionRoute'

export const docTypeRoutes = [
	{
		path: 'doc-types',
		element: (
			<PermissionRoute permissions={['cs-post']}>
				<DocTypes />
			</PermissionRoute>
		),
	},
	{
		path: 'doc-types/new',
		element: (
			<PermissionRoute permissions={['cs-post']}>
				<NewDocType />
			</PermissionRoute>
		),
	},
	{
		path: 'doc-types/edit/:id',
		element: (
			<PermissionRoute permissions={['cs-post']}>
				<EditDocType />
			</PermissionRoute>
		),
	},
	// {
	//   path: 'doc-types/:id',
	//   element: (
	//     <PermissionRoute permissions={['admin-post']}>
	//       <ViewDocType />
	//     </PermissionRoute>
	//   ),
	// },
]
