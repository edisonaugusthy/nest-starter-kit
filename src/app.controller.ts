import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Health Check')
export class AppController {
  @Get()
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @ApiOperation({ summary: 'health check', description: 'true' })
  heartBeat() {
    return true;
  }
}
