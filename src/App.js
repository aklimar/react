import React, { useEffect, useState } from "react";
import './styles/App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from './сomponents/UI/navbar/NavBar';
import AppRouter from "./сomponents/AppRouter";
import { AuthContext } from "./context/context";
function App() {
const [isAuth, setIsAuth]=useState(false);

useEffect(()=>{
  if(localStorage.getItem('auth')){
    setIsAuth(true);
  }
},[])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
          <BrowserRouter>
                <NavBar/>
                <AppRouter/>
          </BrowserRouter>
    </AuthContext.Provider>
  )
}
export default App;

