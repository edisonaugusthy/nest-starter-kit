import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const sampleResponse = [
  {
    id: '0001',
    type: 'donut',
    name: 'Cake',
    ppu: 0.55,
    batters: {
      batter: [
        { id: '1001', type: 'Regular' },
        { id: '1002', type: 'Chocolate' },
        { id: '1003', type: 'Blueberry' },
        { id: '1004', type: "Devil's Food" },
      ],
    },
    topping: [
      { id: '5001', type: 'None' },
      { id: '5002', type: 'Glazed' },
      { id: '5005', type: 'Sugar' },
      { id: '5007', type: 'Powdered Sugar' },
      { id: '5006', type: 'Chocolate with Sprinkles' },
      { id: '5003', type: 'Chocolate' },
      { id: '5004', type: 'Maple' },
    ],
  },
  {
    id: '0002',
    type: 'donut',
    name: 'Raised',
    ppu: 0.55,
    batters: {
      batter: [{ id: '1001', type: 'Regular' }],
    },
    topping: [
      { id: '5001', type: 'None' },
      { id: '5002', type: 'Glazed' },
      { id: '5005', type: 'Sugar' },
      { id: '5003', type: 'Chocolate' },
      { id: '5004', type: 'Maple' },
    ],
  },
  {
    id: '0003',
    type: 'donut',
    name: 'Old Fashioned',
    ppu: 0.55,
    batters: {
      batter: [
        { id: '1001', type: 'Regular' },
        { id: '1002', type: 'Chocolate' },
      ],
    },
    topping: [
      { id: '5001', type: 'None' },
      { id: '5002', type: 'Glazed' },
      { id: '5003', type: 'Chocolate' },
      { id: '5004', type: 'Maple' },
    ],
  },
];
@Controller()
@ApiTags('AI Suggestion Options')
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

  @Get('suggestions/:clientId')
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @ApiOperation({
    summary: 'Enterprize recommendations',
    description: 'Enterprize recommendations from AI tools',
  })
  suggestionByClientId() {
    return sampleResponse;
  }

  @Get('/claudia/suggestions')
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @ApiOperation({
    summary: 'Claudia recommendations',
    description: 'get suggestions from Claudia',
  })
  GetClaudia() {
    return sampleResponse;
  }

  @Get('/gemini/suggestions')
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @ApiOperation({
    summary: 'Gemini recommendations',
    description: 'get suggestions from Google Gemini',
  })
  getGemini() {
    return sampleResponse;
  }

  @Get('/openai/suggestions')
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @ApiOperation({
    summary: 'OpenAI recommendations',
    description: 'get suggestions from Open AI',
  })
  getOpenai() {
    return sampleResponse;
  }
}
