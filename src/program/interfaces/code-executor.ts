import { CodeExecutorArgs } from './code-executor.args';
import { ProgramCodeExecutorResult } from '../engines/program-code-executor.result';

export interface CodeExecutor {
  execute(args: CodeExecutorArgs): Promise<ProgramCodeExecutorResult>;
}
