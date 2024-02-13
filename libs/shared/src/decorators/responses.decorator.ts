import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiNegativeResponses() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad requst',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorised',
    }),
    ApiResponse({
      status: 403,
      description: 'Data already exists',
    }),
    ApiResponse({
      status: 404,
      description: 'No Data found',
    }),
    ApiResponse({
      status: 500,
      description: 'Internel Server error',
    }),
  );
}
