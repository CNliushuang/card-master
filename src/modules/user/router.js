import Login from './components/Login'
import Information from './components/Information'

const routes = [
	{ 
		path: '/information', component: Information
	}
]

const routes_root = [
	{ 
		path: '/login', component: Login
	},
]






export default {routes,routes_root};