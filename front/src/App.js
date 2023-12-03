import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import BrokersPage from './pages/brokers/BrokersPage';
import StocksPage from './pages/stocks/StocksPage';
import TradingPage from './pages/trading/TradingPage';

const router = createBrowserRouter([
    //{path: '/', element: <MainPage />}
    {path: '/brokers', element: <BrokersPage/>},
    {path: '/trading', element: <TradingPage/>},
    {path: '/stocks', element: <StocksPage/>}
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
