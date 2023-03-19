import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import sanitizeHtml from 'sanitize-html-react';

import axios from '../config/axios';
import TodosContext from '../context';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [, dispatch] = useContext(TodosContext);

  const onChangeName = (event) => {
    setUsername(event.target.value);
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const onSubmitForm = (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.warning('All fields required');
      return;
    }

    const obj = {
      username: sanitizeHtml(username),
      password: sanitizeHtml(password)
    };

    axios.post('/login', obj).then(() => {
      dispatch({
        type: 'SET_ADMIN',
        payload: true
      });
      navigate('/');
    }).catch(() => {
      toast.error('Login or password is incorrect');
    })
  }

  return (
    <LoginWrapper>
      <div>Login</div>
      <Form onSubmit={onSubmitForm}>
        <Input type='text' value={username} onChange={onChangeName} placeholder='username...' />
        <Input type='password' value={password} onChange={onChangePassword} placeholder='password...' />

        <SubmitBtnWrapper>
          <SubmitBtn type='submit'>Login</SubmitBtn>
        </SubmitBtnWrapper>
      </Form>
    </LoginWrapper>
  )
}

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 250px;
  height: 300px;
  border: 1px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
`;

const Input = styled.input`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
  background-color: transparent;
  border: 1px solid #05386b;
  border-radius: 5px;
  padding: 5px;
  color: black;
`;

const SubmitBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled.button`
  width: 100px;
  height: 40px;
  margin-bottom: 40px;
  background: green;
  border: none;
  outline: 0;
  font-weight: 700;
  color: white;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
`;