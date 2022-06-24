import { useQuery } from 'react-query';
import todosApiClient from '../../api/todos-api-client';
import React from 'react';
import { ServerStateTodoKeys, useGetTodos } from '../../hooks/todos-hooks';
import { TodoItem } from './components/TodoItem';
import { Todo } from '@prisma/client';

export const TodoList = () => {
  const { data: todos } = useGetTodos();

  return (
    <>
      {/* {isLoading && <p>Loading...</p>}
      {isFetching && <p>Fething...</p>} */}
      {(todos?.length > 0 &&
        todos.map((todo: Todo) => <TodoItem key={todo.id} todo={todo} />)) || (
        <p>No todos</p>
      )}
    </>
  );
};
