import { useContext } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { toast } from 'react-toastify';

import Todo from './Todo';
import SortBy from './SortBy';
import Pagination from './Pagination';
import TodosContext from '../context';

const TodoList = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(TodosContext);

  useEffect(() => {
    axios.get('/todos', { params: { sortby: state.sortBy, page: state.page, direction: state.direction } }).then(res => {
      dispatch({
        type: 'SET_TODOS',
        payload: res.data
      })
    }).catch(() => {
      toast.error('Error has been occured');
    })
  }, [state.sortBy, state.page, state.direction]);

  return (
    <div>
      <AddTodoBtnWrapper>
        <AddTodoBtn onClick={() => navigate('/todos/new')}>+</AddTodoBtn>
      </AddTodoBtnWrapper>

      <SortBy />

      {
        state.todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))
      }

      <Pagination total={state.total} page={state.page} />
    </div>
  )
}

export default TodoList;

const AddTodoBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 40px;
`;

const AddTodoBtn = styled.button`
  width: 50px;
  height: 50px;
  background: #8ee4af;
  border: none;
  outline: 0;
  border-radius: 50%;
  font-weight: 700;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;