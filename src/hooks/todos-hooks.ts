import { Todo } from '@prisma/client';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions
} from 'react-query';
import todosApiClient from '../api/todos-api-client';
import { TodoCreateInput, TodoUpdateInput } from '../lib/todos-repository';
import { showErrorToast, showSuccessToast } from '../utils/toast-utils';

export enum ServerStateTodoKeys {
  TODOS = 'todos'
}

export const useGetTodos = (options?: UseQueryOptions<Todo[]>) => {
  return useQuery(
    ServerStateTodoKeys.TODOS,
    () => todosApiClient.getTodos().then((res) => res.data),
    // The error is handled in the _app.tsx -> global error handler to avoid showing a error toast for every consumer}
    // {
    //   onError: (err) => {
    //     ....
    //   }
    // }
    options
  );
};

export const useDeleteTodo = () => {
  const cache = useQueryClient();
  return useMutation(
    (todoId: number) => todosApiClient.deleteTodoById(todoId),
    {
      onMutate: async (todoId) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await cache.cancelQueries(ServerStateTodoKeys.TODOS);

        // Snapshot the previous value
        const prevTodos = (cache.getQueryData(ServerStateTodoKeys.TODOS) ||
          []) as Todo[];

        // Optimistically update to the new value
        cache.setQueryData(
          ServerStateTodoKeys.TODOS,
          prevTodos.filter((todo) => todo.id !== todoId)
        );

        showSuccessToast('The todo has been removed');

        // Return a context object with the snapshotted value
        return { prevTodos };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err: any, _variables, context) => {
        cache.setQueryData(ServerStateTodoKeys.TODOS, context.prevTodos);
        showErrorToast(err?.message);
      },
      // Always refetch after error or success:
      onSettled: async () => {
        await cache.invalidateQueries(ServerStateTodoKeys.TODOS);
      }
    }
    // {
    //   onSuccess: () => {
    //     cache.invalidateQueries(ServerStateTodoKeys.TODOS);
    //     showSuccessToast('Todo deleted successfully');
    //   },
    //   onError: (err: any) => {
    //     showErrorToast(err?.message);
    //   }
    // }
  );
};

export const useUpdateTodo = () => {
  const cache = useQueryClient();
  return useMutation(
    (todo: TodoUpdateInput) => todosApiClient.updateTodo(undefined, todo),
    {
      onMutate: async (todo) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await cache.cancelQueries(ServerStateTodoKeys.TODOS);

        // Snapshot the previous value
        const prevTodos = (cache.getQueryData(ServerStateTodoKeys.TODOS) ||
          []) as Todo[];

        // Optimistically update to the new value
        cache.setQueryData(
          ServerStateTodoKeys.TODOS,
          prevTodos.map((t) => {
            if (t.id === todo.id) {
              return { ...t, ...todo };
            }
            return t;
          })
        );

        showSuccessToast('The todo has been updated');

        // Return a context object with the snapshotted value
        return { prevTodos };
      },
      // onSuccess: () => {
      //   cache.invalidateQueries(ServerStateTodoKeys.TODOS);
      //   showSuccessToast('Todo updated successfully');
      // }

      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err: any, _variables, context) => {
        cache.setQueryData(ServerStateTodoKeys.TODOS, context.prevTodos);
        showErrorToast(err?.message);
      },
      // Always refetch after error or success:
      onSettled: async () => {
        await cache.invalidateQueries(ServerStateTodoKeys.TODOS);
      }
    }
  );
};

export const useCreateTodo = () => {
  const cache = useQueryClient();

  return useMutation(
    (todo: TodoCreateInput) => todosApiClient.createTodo(undefined, todo),
    {
      onMutate: async (newTodo) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await cache.cancelQueries(ServerStateTodoKeys.TODOS);

        // Snapshot the previous value
        const prevTodos = (cache.getQueryData(ServerStateTodoKeys.TODOS) ||
          []) as Todo[];

        // Optimistically update to the new value
        cache.setQueryData(ServerStateTodoKeys.TODOS, (old: Todo[]) => [
          ...old,
          newTodo
        ]);

        showSuccessToast('The todo has been created');

        // Return a context object with the snapshotted value
        return { prevTodos };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err: any, _newTodo, context) => {
        cache.setQueryData(ServerStateTodoKeys.TODOS, context.prevTodos);
        showErrorToast(err?.message);
      },
      // Always refetch after error or success:
      onSettled: () => {
        cache.invalidateQueries(ServerStateTodoKeys.TODOS);
      }
    }
    // {
    //   onSuccess: () => {
    //     cache.invalidateQueries(ServerStateTodoKeys.TODOS);
    //     showSuccessToast('Todo created successfully');
    //   },
    //   onError: (err: any) => {
    //     showErrorToast(err?.message);
    //   }
    // }
  );
};
