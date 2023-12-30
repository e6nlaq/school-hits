import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import './css/index.css';
import Home from './Home';
import Setting from './Setting';
import About from './About';

const App = () => {
	return (
		<>
			<BrowserRouter basename={import.meta.env.BASE_URL}>
				<div id='nav' className='tab-area-base'>
					<ul className='tab-menu-base'>
						<li>
							<Link to='/'>
								<span className='material-symbols-rounded'>
									home
								</span>
								Home
							</Link>
						</li>

						<li>
							<Link to='/setting'>
								<span className='material-symbols-rounded'>
									settings
								</span>
								Setting
							</Link>
						</li>

						<li>
							<Link to='/about'>
								<span className='material-symbols-rounded'>
									info
								</span>
								About
							</Link>
						</li>
					</ul>
				</div>

				<div className='main_browser'>
					<Routes>
						<Route path='/' element={<Home />}></Route>
						<Route path='/setting' element={<Setting />}></Route>
						<Route path='/about' element={<About />}></Route>
					</Routes>
				</div>
			</BrowserRouter>
		</>
	);
};

export default App;
