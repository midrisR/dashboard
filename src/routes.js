import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import Transactions from './templates/Pages/transaction';
import Costumer from './templates/Pages/costumer';
// import CostumerById from './templates/Pages/slug/costumer';
import Categories from './templates/Pages/categorie';
import { GlobalProvider } from './context/GlobalState';
const queryClient = new QueryClient();

export default function Routes() {
	return (
		<Router>
			<QueryClientProvider client={queryClient}>
				<GlobalProvider>
					<Switch>
						<Route path='/' component={App} />
						<Route path='/transactions' component={Transactions} />
						<Route path='/categories' component={Categories} />
						<Route path='/costumers' component={Costumer} />
					</Switch>
				</GlobalProvider>
			</QueryClientProvider>
		</Router>
	);
}
