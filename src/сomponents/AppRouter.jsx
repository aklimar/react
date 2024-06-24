import { Route,Routes } from 'react-router-dom';
import { privateRoutes,publicRoutes } from './../routes/routes';
import { useContext } from 'react';
import { AuthContext } from '../context/context';


const AppRouter = () => {
    const {isAuth}=useContext(AuthContext)
    return ( 
        isAuth
        ?
        <Routes>
        {privateRoutes.map(route=>
            <Route 
            element={<route.element/>} 
            path={route.path}
            exact={route.exact}
            key={route.path}
            />
            
        )}
    </Routes>
        :
        <Routes>
        {publicRoutes.map(route=>
            <Route 
            element={<route.element/>} 
            path={route.path}
            exact={route.exact}
            key={route.path}
            />
        )}
        </Routes>
    );
}

export default AppRouter;