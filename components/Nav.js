import axios from 'axios';
import { useState } from 'react';

export default function Nav({ todos, setTodos, reloadTodos }) {
  const [current, setCurrent] = useState('all');

  const showAllTodos = () => {
    setTodos(todos.all);
    setCurrent('all');
  };
  const showActiveTodos = () => {
    setTodos(todos.active);
    setCurrent('active');
  };
  const showCompletedTodos = () => {
    setTodos(todos.completed);
    setCurrent('completed');
  };

  const deleteCompletedTodos = () => {
    todos.completed.forEach((todo) => {
      axios.post('/api/todos/delete', { id: todo._id }).then(reloadTodos);
    });
  };

  return (
    <>
      <div className='sm:hidden flex justify-between text-sm text-gray-500 bg-white dark:bg-gray-800 rounded-b-md py-4 px-6'>
        <p>{`${todos?.active?.length || 0} items left`}</p>
        <button onClick={deleteCompletedTodos}>Clear Completed</button>
      </div>
      <nav className='text-sm sm:flex justify-between items-center bg-white dark:bg-gray-800 text-gray-500 rounded-md sm:rounded-t-none mt-6 px-3 sm:mt-0'>
        <p className='hidden sm:block'>{`${
          todos?.active?.length || 0
        } items left`}</p>
        <ul className='flex justify-center items-center space-x-2 h-12 font-bold'>
          <li>
            <button
              className={`${
                current === 'all' && 'text-blue-600'
              } hover:text-blue-900 dark:hover:text-gray-300 focus:outline-none`}
              onClick={showAllTodos}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={`${
                current === 'active' && 'text-blue-600'
              } hover:text-blue-900 dark:hover:text-gray-300 focus:outline-none`}
              onClick={showActiveTodos}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={`${
                current === 'completed' && 'text-blue-600'
              } hover:text-blue-900 dark:hover:text-gray-300 focus:outline-none`}
              onClick={showCompletedTodos}
            >
              Completed
            </button>
          </li>
        </ul>
        <button
          className='hover:text-gray-600 dark:hover:text-gray-300 hidden sm:block focus:outline-none'
          onClick={deleteCompletedTodos}
        >
          Clear Completed
        </button>
      </nav>
    </>
  );
}
