import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import TodoList from './TodoList';
import Login from './Login';
import NewOrEditTodo from './NewOrEditTodo';

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<TodoList />} />
          <Route path='/todos/new' element={<NewOrEditTodo />} />
          <Route path='/todos/edit/:id' element={<NewOrEditTodo />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Main>
    </>
  )
}

export default Layout;

const Main = styled.main`
  width: 960px;
  margin: 0 auto;
  padding: 20px;
`;