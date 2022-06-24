import { Todo } from '@prisma/client';
import { AddTodo } from '../components/AddTodo';
import { TodoContainer } from '../components/TodoContainer';
import { TodoList } from '../components/TodoList';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { ServerStateTodoKeys } from '../hooks/todos-hooks';
import todosApiClient from '../api/todos-api-client';

type HomeProps = {
  todos: Todo[];
};

export default function Home({ todos }: HomeProps) {
  return (
    <TodoContainer>
      <AddTodo />
      <TodoList />
    </TodoContainer>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(ServerStateTodoKeys.TODOS, () =>
    todosApiClient.getTodos().then((res) => res.data)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}
