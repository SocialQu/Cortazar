import { NavBar } from './components/NavBar'
import { Stories } from './components/Grid'

import 'bulma/css/bulma.css'
import './App.css'

export const App = () => <>
	<NavBar />
	<div className="section" style={{padding:'1.5rem' }}>
		<Stories stories={[]}/>
	</div>
</>
