import { useContext } from 'react';
import styled from 'styled-components';

import TodosContext from '../context';

const SortBy = () => {
  const [state, dispatch] = useContext(TodosContext);

  const onChangeSorting = (event) => {
    dispatch({
      type: 'CHANGE_SORTING',
      payload: event.target.value
    })
  }

  const onChangeDirection = (event) => {
    dispatch({
      type: 'CHANGE_DIRECTION',
      payload: event.target.value
    })
  }

  return (
    <FiltersWrapper>
      <div>
        <span>Sort by: </span>
        <select select={state.sortBy} onChange={onChangeSorting}>
          <option value='complete'>Status</option>
          <option value='name'>Name</option>
          <option value='email'>Email</option>
        </select>
      </div>

      <div>
        <span>Direction: </span>
        <select select={state.direction} onChange={onChangeDirection}>
          <option value='ASC'>ASC</option>
          <option value='DESC'>DESC</option>
        </select>
      </div>
    </FiltersWrapper>
  )
};

export default SortBy;

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0;

  & span {
    margin-right: 10px;
  }

  & div:first-child {
    margin-right: 10px;
  }
`;