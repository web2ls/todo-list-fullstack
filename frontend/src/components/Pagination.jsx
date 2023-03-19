import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import TodosContext from '../context';

const RECORDS_PER_PAGE = 3;

const Pagination = ({ total, page }) => {
  const [state, dispatch] = useContext(TodosContext);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    setElements(getElementsAmount());
  }, [total]);

  const getElementsAmount = () => {
    const result = [];
    const perPage = Math.ceil(total / RECORDS_PER_PAGE);
    for (let i = 0; i < perPage; i++) {
      result.push(i + 1);
    }
    return result;
  }

  const onChangePage = (num) => {
    dispatch({
      type: 'SET_PAGE',
      payload: num - 1
    })
  }

  return (
    <PaginationWrapper>
      {
        elements.map(x => (
          <Page key={x} active={x === page + 1} onClick={() => onChangePage(x)}>{x}</Page>

        ))
      }
    </PaginationWrapper>
  )
};

export default Pagination;

const PaginationWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Page = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border: 1px solid black;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  background-color: ${(props) => props.active ? 'green' : 'transparent'};
`;