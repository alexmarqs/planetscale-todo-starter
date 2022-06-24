import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import { AppError, HttpStatus } from '../../../utils/http-utils';

/**
 * Error handling middleware
 */
export default function withErrorHandling(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    return (handler(req, res) as Promise<unknown>).catch((error) => {
      console.error(error);
      let errorStatus =
        error instanceof AppError
          ? error.statusCode
          : HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(errorStatus).json({
        status: errorStatus,
        message: error.message || 'Internal Server Error API'
      });
    });
  };
}
