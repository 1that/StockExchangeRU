import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import BrokersPage from './pages/brokers/BrokersPage';

const router = createBrowserRouter([
    {path: '/brokers', element: <BrokersPage/>},
    // {path: '/brokers', element: <BrokersPage/>},
    // {path: '/trading', element: <TradingPage/>},
    // {path: '/stoks', element: <StoksPage/>}
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
