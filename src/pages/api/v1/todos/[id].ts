import { NextApiRequest, NextApiResponse } from 'next';
import withErrorHandling from '../../_middlewares/with-error-handling';
import { getTodoById, deleteTodoById } from '../../../../lib/todos-repository';
import { withMethods } from '../../_middlewares/with-methods';
import { HttpStatus } from '../../../../utils/http-utils';
import { withOpenAPIValidation } from '../../_middlewares/with-openapi-validator';

/**
 * Todos API -> /{id}
 * @param req
 * @param res
 * @returns
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET': {
      const todo = await getTodoById(Number(id));
      return res.status(HttpStatus.OK).json(todo);
    }
    case 'DELETE': {
      await deleteTodoById(Number(id));
      return res.status(HttpStatus.DELETED).end();
    }
  }
}

export default withErrorHandling(
  withMethods(['GET', 'DELETE'], withOpenAPIValidation(handler))
);
