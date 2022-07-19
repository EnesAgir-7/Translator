import { HashRouter as Router,Routes, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import TextPage from './pages/TextPage';
import TextsListPage from './pages/TextsListPage';

function App() {
    return (
        <Router>
            <div className="container dark">
                <div className='app'>
                    <Header/>
                    <Routes>
                        <Route index path="/" element={<TextsListPage/>}/>
                        <Route index path="/text/:id" element={<TextPage/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
