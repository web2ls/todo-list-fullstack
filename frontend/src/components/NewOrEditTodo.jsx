import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../config/axios';
import sanitizeHtml from 'sanitize-html-react';

const NewOrEditTodo = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEdit] = useState(!!id);

  useEffect(() => {
    if (isEdit) {
      axios.get(`/todos/${id}`).then(res => {
        const edited = res.data[0];
        setName(edited.name);
        setEmail(edited.email);
        setText(edited.text);
      }).catch(() => {
        toast.error('Error has been occured');
      })
    }
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!name.trim() || !email.trim() || !text.trim()) {
      toast.warning('All fields required');
      return;
    }

    const obj = {
      name: sanitizeHtml(name),
      email: sanitizeHtml(email),
      text: sanitizeHtml(text),
      complete: false
    };

    if (isEdit) {
      axios.put(`/todos/${id}`, obj).then(res => {
        toast.success('Todo has been edited');
        navigate('/');
      }).catch(() => {
        toast.error('Error has been occured');
      })
    } else {
      axios.post('/todos', obj).then(res => {
        toast.success('Todo has been created');
        navigate('/');
      }).catch(() => {
        toast.error('Error has been occured');
      })

    }

  }

  const onChangeName = (event) => {
    setName(event.target.value);
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  }
  const onChangeText = (event) => {
    setText(event.target.value);
  }

  return (
    <div>
      <div>
        <BackToListBtn onClick={() => navigate('/')}>Back to list</BackToListBtn>
      </div>
      <div>
        <Form onSubmit={onSubmit}>
          <Input type='text' value={name} onChange={onChangeName} placeholder='name...' />
          <Input type='email' value={email} onChange={onChangeEmail} placeholder='email...' />
          <Textarea value={text} onChange={onChangeText} placeholder='text...' />

          <SubmitBtnWrapper>
            <SubmitBtn type='submit'>Submit</SubmitBtn>
          </SubmitBtnWrapper>
        </Form>
      </div>
    </div>
  )
};

export default NewOrEditTodo;

const BackToListBtn = styled.button`
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  width: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
  background-color: transparent;
  border: 1px solid #05386b;
  border-radius: 5px;
  padding: 5px;
  color: black;
`;

const Textarea = styled.textarea`
  width: 300px;
  max-width: 300px;
  min-width: 300px;
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
  justify-content: flex-end;
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