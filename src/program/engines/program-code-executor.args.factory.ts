import { ProgramCodeExecutorArgs } from './program-code-executor.args';
import { ProgramRequest } from '../models/program.request';
import { v4 as uuid } from 'uuid';
import { FileExtension } from '../models/file-extension';

export class ProgramCodeExecutorArgsFactory {
  static dart(createProgramInput: ProgramRequest): ProgramCodeExecutorArgs {
    const currentUUID = uuid();
    const fileExtension = FileExtension.DART;
    const { language, stdin } = createProgramInput;
    const containerName = `${language.toLowerCase()}-pmc-compiler-${currentUUID}`;
    const tmpFilename = `${uuid()}${fileExtension}`;
    return new ProgramCodeExecutorArgs(
      `base64 -d ${tmpFilename} >> res-${tmpFilename} && dart res-${tmpFilename}`,
      'dart',
      tmpFilename,
      containerName,
      '/app',
      '',
      stdin,
    );
  }

  static python(createProgramInput: ProgramRequest): ProgramCodeExecutorArgs {
    const currentUUID = uuid();
    const fileExtension = FileExtension.PYTHON;
    const { language, stdin } = createProgramInput;
    const containerName = `${language.toLowerCase()}-pmc-compiler-${currentUUID}`;
    const tmpFilename = `${uuid()}${fileExtension}`;
    return new ProgramCodeExecutorArgs(
      `base64 -d ${tmpFilename} >> res-${tmpFilename} && python3 res-${tmpFilename}`,
      'python',
      tmpFilename,
      containerName,
      '/app',
      '',
      stdin,
    );
  }

  static c(createProgramInput: ProgramRequest): ProgramCodeExecutorArgs {
    const currentUUID = uuid();
    const fileExtension = FileExtension.C;
    const { language, stdin } = createProgramInput;
    const containerName = `${language.toLowerCase()}-pmc-compiler-${currentUUID}`;
    const tmpFilename = `${uuid()}${fileExtension}`;
    const tmpCompiledFilename = 'a.out';
    return new ProgramCodeExecutorArgs(
      `base64 -d ${tmpFilename} >> res-${tmpFilename} && gcc res-${tmpFilename} && ./${tmpCompiledFilename}`,
      'gcc',
      `${tmpFilename}`,
      containerName,
      '/app',
      tmpCompiledFilename,
      stdin,
    );
  }
}
