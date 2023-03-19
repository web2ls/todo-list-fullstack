import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../config/axios';
import { toast } from 'react-toastify';

import TodosContext from '../context';

const Header = () => {
  const [state, dispatch] = useContext(TodosContext);
  const navigate = useNavigate();

  const onLogout = () => {
    axios.get('/logout').then(() => {
      dispatch({
        type: 'SET_ADMIN',
        payload: false
      });
      navigate('/');
    }).catch(err => {
      toast.error('Error has been occured');
    })
  }

  return (
    <HeaderWrapper>
      <div>ToDo List</div>
      {state.isAdmin && <Btn onClick={onLogout}>Logout</Btn>}
      {!state.isAdmin && <Btn onClick={() => navigate('/login')}>Login</Btn>}
    </HeaderWrapper>
  )
}

export default Header;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background: #379683;
  color: white;
`;

const Btn = styled.div`
  cursor: pointer;
`;

