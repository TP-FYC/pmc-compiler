import { Body, Controller, Post } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramRequest } from './models/program.request';
import { ProgramResponse } from './models/program.response';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('program')
@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post('/')
  async compile(@Body() body: ProgramRequest): Promise<ProgramResponse> {
    return this.programService.createProgram(body);
  }

  @MessagePattern({ cmd: 'execute_program' })
  executeProgram(data: ProgramRequest): Promise<ProgramResponse> {
    return this.programService.createProgram(data);
  }
}
