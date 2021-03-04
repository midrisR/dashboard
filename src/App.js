import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Sidebar from './templates/Sidebar';
import Transactions from './templates/Pages/transaction';
import Costumer from './templates/Pages/costumer';
import CostumerById from './templates/Pages/slug/costumer';
import Categorie from './templates/Pages/categorie';
import Dashboard from './templates/Pages/Dashboard';
import CreateCostumers from './components/costumers/create';
import MainHead from './templates/Main/main-head';

const App = () => (
	<div className='min-h-screen bg-full-dark flex flex-wrap'>
		<Sidebar />
		<div className='w-5/6 __main relative'>
			<MainHead />
			<div className='mx-6 relative'>
				<Switch>
					<Route path='/' exact component={Dashboard} />
					<Route path='/transactions' exact component={Transactions} />
					<Route path='/categories' exact component={Categorie} />
					<Route path='/costumers' exact component={Costumer} />
					<Route path='/costumers/view/:id' exact component={CostumerById} />
					<Route path='/costumers/create' component={CreateCostumers} />
				</Switch>
			</div>
		</div>
	</div>
);
export default App;
