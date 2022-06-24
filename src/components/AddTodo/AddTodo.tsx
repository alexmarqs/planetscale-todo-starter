import { useCreateTodo } from '../../hooks/todos-hooks';
import { useState } from 'react';

export const AddTodo = () => {
  const { mutate: createTodo } = useCreateTodo();
  const [description, setDescription] = useState('');

  const handleAddTodo = () => {
    createTodo({ description });
    setDescription('');
  };

  return (
    <div className="flex mt-4 mb-4">
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-500"
        placeholder="Add todo description here"
      />
      <button
        className="flex-shrink-0 p-2 border-2 rounded hover:bg-teal-300 hover:text-white"
        onClick={handleAddTodo}
      >
        Add
      </button>
    </div>
  );
};
