import { Todo } from '@prisma/client';
import { useMutation, useQueryClient } from 'react-query';
import todosApiClient from '../../../api/todos-api-client';
import { useDeleteTodo, useUpdateTodo } from '../../../hooks/todos-hooks';
import { cn } from '../../../utils/classes-utils';
export type TodoItem = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItem) => {
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  return (
    <div className="flex mb-4 items-center">
      <p
        className={cn(
          'w-full text-teal-600',
          todo.isCompleted && 'line-through text-green-400'
        )}
      >
        {todo.description}
      </p>

      <button
        className={cn(
          'flex-shrink-0 p-2 ml-4 mr-2  rounded bg-green-400 hover:bg-green-400 hover:text-current border-green-400',
          todo.isCompleted &&
            'bg-yellow-400 hover:bg-yellow-400 hover:text-current border-yellow-400'
        )}
        onClick={() =>
          updateTodo({ id: todo.id, isCompleted: !todo.isCompleted })
        }
      >
        {todo.isCompleted ? 'Restore' : 'Done'}
      </button>
      <button
        className="flex-shrink-0 p-2 ml-4 mr-2 bg-red-600 rounded"
        onClick={() => deleteTodo(todo.id)}
      >
        Remove
      </button>
    </div>
  );
};
