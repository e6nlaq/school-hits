import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import './css/index.css';
import Home from './Home';
import Setting from './Setting';

const App = () => {
	return (
		<>
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
			/>

			<BrowserRouter basename={import.meta.env.BASE_URL}>
				<div id="nav" className="tab-area-base">
					<ul className="tab-menu-base">
						<li>
							<Link to="/">
								<span className="material-symbols-rounded">
									home
								</span>
								Home
							</Link>
						</li>

						<li>
							<Link to="/setting">
								<span className="material-symbols-rounded">
									settings
								</span>
								Setting
							</Link>
						</li>
					</ul>
				</div>

				<br />
				<br />

				<div className="main_browser">
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route path="/setting" element={<Setting />}></Route>
					</Routes>
				</div>
			</BrowserRouter>
		</>
	);
};

export default App;
