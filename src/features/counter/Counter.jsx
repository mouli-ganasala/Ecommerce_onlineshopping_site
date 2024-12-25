import { useSelector, useDispatch } from 'react-redux';
import {
  increment,decrement
} from './counterSlice';
import { selectCount } from './counterSlice';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
      <button
          aria-label="Increment value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className='text-yellow-400 text-5xl'>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
    </div>
  );
}