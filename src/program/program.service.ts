import { Injectable } from '@nestjs/common';
import { ProgramCodeExecutor } from './engines/program-code-executor';
import { ProgramCodeExecutorArgs } from './engines/program-code-executor.args';
import { Language } from './models/language';
import { ProgramCodeExecutorArgsFactory } from './engines/program-code-executor.args.factory';
import { ProgramRequest } from './models/program.request';
import { ProgramResponse } from './models/program.response';

@Injectable()
export class ProgramService {
  constructor(private programCodeExecutor: ProgramCodeExecutor) {}
  async createProgram(programDto: ProgramRequest): Promise<ProgramResponse> {
    let args: ProgramCodeExecutorArgs;
    switch (programDto.language) {
      case Language.DART:
        args = ProgramCodeExecutorArgsFactory.dart(programDto);
        break;
      case Language.PYTHON:
        args = ProgramCodeExecutorArgsFactory.python(programDto);
        break;
      case Language.C:
        args = ProgramCodeExecutorArgsFactory.c(programDto);
        break;
    }

    if (args != null) {
      const executionResult = await this.programCodeExecutor.execute(args);
      return {
        stdout: executionResult.getStdout(),
      };
    }
  }
}
