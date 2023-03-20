import {Header} from './components/Header.jsx';
import Login from './components/Login';
import Register from './components/Register';
import CreateBook from './components/CreateBook.jsx';
import GetAllOrder from './components/GetAllOrder.jsx';
import CreateOrder from './components/CreateOrder.jsx';

import SearchBooksData from './components/SearchData.js';
import SearchOrdersData from './components/SearchOrder.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import AllBooks from './components/AllAvailableBooks/AllBooks.jsx';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

const userToken= localStorage.getItem('token')

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        {/* {userToken ? undefined : <Header />} */}
        <Header />
        <h1 style={{color:"white"}}>Welcome To In MERN Based Book Store</h1>
        <Routes>
          <Route path='/' element={<AllBooks />} >  </Route>
          <Route path='register' element={<Register />} >  </Route>
          <Route path='login' element={<Login />} >  </Route>
          <Route path='CreateBook' element={<CreateBook />} >  </Route>
          <Route path='/CreateOrder' element={<CreateOrder />} >  </Route>
          <Route path='/GetAllOrdered' element={<GetAllOrder/>} >  </Route>
          
          <Route path='searchBook' element={<SearchBooksData />} >  </Route>
          <Route path='searchOrder' element={<SearchOrdersData />} >  </Route>
          <Route path='*' element={<PageNotFound />} >  </Route>

        </Routes>
       
      </BrowserRouter>
    </div>



  );
}

export default App;
