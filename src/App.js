import { BrowserRouter, Route,Routes } from "react-router-dom";
import { Home, Login, Signup, Cart, Orders } from "./Pages";
import { Provider } from "react-redux";
import store from "./store/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path='/' />
          <Route element={<Login/>} path='/login' />
          <Route element={<Signup/>} path='/signup' />
          <Route element={<Cart/>} path="/cart"/>
          <Route element={<Orders/>} path='/orders' /> 
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
