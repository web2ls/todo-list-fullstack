import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../config/axios';
import { toast } from 'react-toastify';

import TodosContext from '../context';

const Todo = ({ todo }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(TodosContext);

  const onDeleteTodo = (id) => {
    axios.delete(`/todos/${id}`).then(() => {
      toast.success('Todo has been deleted');
      dispatch({
        type: 'DELETE_TODO',
        payload: id
      });
    }).catch(() => {
      toast.error('Error has been occured');
    })
  }

  const onCompleteTask = (id) => {
    if (todo.complete) return;

    axios.put(`/todos/complete/${id}`).then(() => {
      toast.success('Todo has been completed');
      dispatch({
        type: 'COMPLETE_TODO',
        payload: id
      });
    }).catch(() => {
      toast.error('Error has been occured');
    })
  }

  return (
    <TodoWrapper>
      <TodoStatus active={todo.complete} />
      <TodoHeaderWrapper>
        <TodoMetaWrapper>
          <TodoMeta>{todo.name}</TodoMeta>
          <TodoMeta>({todo.email})</TodoMeta>
        </TodoMetaWrapper>
        {state.isAdmin && (
          <div>
            <TodoControl completed={todo.complete} onClick={() => onCompleteTask(todo.id)}>{todo.complete ? 'Completed' : 'Complete'}</TodoControl>
            <TodoControl onClick={() => navigate(`/todos/edit/${todo.id}`)}>Edit</TodoControl>
            <TodoControl delete={true} onClick={() => onDeleteTodo(todo.id)}>Delete</TodoControl>
          </div>

        )}
      </TodoHeaderWrapper>

      <TodoText>
        {todo.text}
      </TodoText>
    </TodoWrapper>
  )
}

export default Todo;

const TodoStatus = styled.div`
  width: 100%;
  height: 20px;
  background: ${(props) => props.active ? '#8ee4af' : '#05386b'};
`;

const TodoWrapper = styled.div`
  width: 100%;
  height: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: rgba(47,79,79,0.7);
`;

const TodoHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 20px;
  padding: 0 10px;
`;

const TodoMetaWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  height: 20px;
`;

const TodoMeta = styled.span`
  max-width: 200px;
  height: 20px;
  overflow: hidden;
  display: inline-block;
  margin-right: 10px;
  color: whitesmoke;
  font-weight: 300;
  font-size: 14px;
`;

const TodoControl = styled.span`
  margin-right: 10px;
  color: ${(props) => props.delete ? 'red' : props.completed ? '#379683' : 'yellow'};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
`;

const TodoText = styled.p`
  padding: 0 10px;
  color: white;
  font-weight: 400;
  font-size: 16px;
`;