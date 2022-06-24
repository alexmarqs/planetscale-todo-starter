import { NextApiRequest, NextApiResponse } from 'next';
import { HttpStatus } from '../../../../utils/http-utils';
import {
  createTodo,
  getTodos,
  updateTodo
} from '../../../../lib/todos-repository';
import withErrorHandling from '../../_middlewares/with-error-handling';
import { withMethods } from '../../_middlewares/with-methods';
import { withOpenAPIValidation } from '../../_middlewares/with-openapi-validator';

/**
 * Todos API -> /
 * @param req
 * @param res
 * @returns
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const { description } = req.body;

      const todo = await createTodo({ description });

      return res.status(HttpStatus.CREATED).json(todo);
    }
    case 'GET': {
      const { offset, limit } = req.query;

      const todos = await getTodos(
        offset ? Number(offset) : undefined,
        limit ? Number(limit) : undefined
      );
      return res.status(HttpStatus.OK).json(todos);
    }
    case 'PUT': {
      const todo = req.body;
      console.log('🚀 ~ file: index.ts ~ line 39 ~ handler ~ todo', todo);

      await updateTodo(todo);

      return res.status(HttpStatus.OK).end();
    }
  }
}

export default withErrorHandling(
  withMethods(['GET', 'POST', 'PUT'], withOpenAPIValidation(handler))
);
