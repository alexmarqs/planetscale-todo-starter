import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import { AppError, HttpStatus } from '../../../utils/http-utils';

/**
 * Method validation middleware
 */
export function withMethods(methods: string[], handler: NextApiHandler) {
  return async function (request: NextApiRequest, response: NextApiResponse) {
    if (!methods.includes(request.method)) {
      response.setHeader('Allow', methods.join(', '));
      throw new AppError(
        HttpStatus.METHOD_NOT_ALLOWED,
        `Method ${request.method} Not Allowed`
      );
    }
    return handler(request, response);
  };
}
