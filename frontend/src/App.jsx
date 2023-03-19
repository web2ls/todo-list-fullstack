import { useReducer } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

import Layout from './components/Layout';
import TodosContext from './context';
import reducer from './reducer';

function App() {
  const initialState = {
    todos: [],
    sortBy: 'complete',
    page: 0,
    direction: 'ASC',
    total: 0,
    isAdmin: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <TodosContext.Provider value={[state, dispatch]}>
        <Layout />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="colored"
        />
      </TodosContext.Provider>
    </div>
  )
}

export default App
