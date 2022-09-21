import { useState } from 'react';
import Checkbox from './Checkbox';
import CrossIcon from '../icons/Cross';

export default function Todo({ todo, onDelete, onUpdate, disabled }) {
  const [completed, setCompleted] = useState(todo.completed);
  const toggleCompleted = () => {
    onUpdate(todo);
    setCompleted(!completed);
  };

  const deleteTodo = () => {
    onDelete(todo.id);
  };

  return (
    <div className='flex justify-between space-x-3 bg-white dark:bg-gray-800 shadow-sm py-4 px-6 border-b dark:border-gray-700'>
      <Checkbox
        completed={completed}
        toggleCompleted={toggleCompleted}
        disabled={disabled}
      />
      <p
        className={`flex-1 text-sm text-gray-900 dark:text-gray-100 ${
          todo.completed && 'line-through text-gray-400 dark:text-gray-500'
        }`}
      >
        {todo.text}
      </p>
      {disabled ?? (
        <button
          aria-label='Delete Todo'
          className='focus:outline-none'
          type='button'
          onClick={deleteTodo}
        >
          <CrossIcon />
        </button>
      )}
    </div>
  );
}
