import { CodeExecutorResult } from '../interfaces/code-executor.result';

export class ProgramCodeExecutorResult implements CodeExecutorResult {
  private readonly _stdin: string;
  private readonly _stdout: string;

  constructor(stdin: string, stdout: string) {
    this._stdin = stdin;
    this._stdout = stdout;
  }

  getStdin(): string {
    return this._stdin;
  }

  getStdout(): string {
    return this._stdout;
  }
}
