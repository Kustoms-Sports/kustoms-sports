import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import { Home, Details, Categories } from '../views/index'
const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path={'/'} element={<Home/>} />
                    <Route path={'/producto/:id'} element={<Details/>} />
                    <Route path={'categories/:category'} element={<Categories/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas