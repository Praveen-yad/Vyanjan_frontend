import { BrowserRouter, Route,Routes } from "react-router-dom";
import { Home, Login, Signup, Cart, Orders, Business,InvalidePage } from "./Pages";


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<InvalidePage/>} path="*" />
          <Route element={<Home/>} path='/' />
          <Route element={<Login/>} path='/login' />
          <Route element={<Signup/>} path='/signup' />
          <Route element={<Cart/>} path='/cart' /> 
          <Route element={<Orders/>} path='/orders' /> 
          <Route element={<Business/>} path="/business" />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
