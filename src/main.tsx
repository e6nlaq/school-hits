import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

import App from './App.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<FluentProvider theme={teamsLightTheme}>
			<CookiesProvider>
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</CookiesProvider>
		</FluentProvider>
	</React.StrictMode>
);
