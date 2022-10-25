import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { History } from './pages/History';
import { Home } from './pages/Home';

export function Rounter(){
    return (
        <Routes>
            <Route path='/' element={<DefaultLayout />}>  {/* página de rotas mostradas na URL */}
                <Route path='/' element={<Home />}/>
                <Route path='/history' element={<History />}/>
            </Route>
        </Routes>
    )
}   