import { ProgramCodeExecutorArgs } from './program-code-executor.args';
import { ProgramCodeExecutorResult } from './program-code-executor.result';
import { Injectable } from '@nestjs/common';
import { CodeExecutor } from '../interfaces/code-executor';
import { ProgramCodeCryptor } from './program-code-cryptor';
import { Worker } from 'worker_threads';

@Injectable()
export class ProgramCodeExecutor implements CodeExecutor {
  constructor(private codeCryptor: ProgramCodeCryptor) {}

  async execute(
    args: ProgramCodeExecutorArgs,
  ): Promise<ProgramCodeExecutorResult> {
    const worker = new Worker('./worker.js', {
      workerData: {
        value: {
          command: args.getCommand(),
          dockerImage: args.getDockerImage(),
          fileName: args.getFileName(),
          containerName: args.getContainerName(),
          workdir: args.getWorkdir(),
          compiledFileName: args.getCompiledFileName(),
          data: args.getData(),
        },
        path: './worker.ts',
      },
    });

    return new Promise((resolve, reject) => {
      worker.on('message', (result) => {
        const res = new ProgramCodeExecutorResult(result.stdin, result.stdout);
        return resolve(res);
      });
    });
  }
}
