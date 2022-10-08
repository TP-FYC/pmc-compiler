import { CodeExecutorArgs } from '../interfaces/code-executor.args';

export class ProgramCodeExecutorArgs implements CodeExecutorArgs {
  private readonly _data?: string;
  private readonly _compiledFileName?: string;
  private readonly _command: string;
  private readonly _dockerImage: string;
  private readonly _fileName: string;
  private readonly _workdir: string;
  private readonly _containerName: string;

  constructor(
    command: string,
    dockerImage: string,
    fileName: string,
    containerName: string,
    workdir: string,
    compiledFileName?: string,
    data?: string,
  ) {
    this._data = data;
    this._command = command;
    this._dockerImage = dockerImage;
    this._fileName = fileName;
    this._workdir = workdir;
    this._containerName = containerName;
    this._compiledFileName = compiledFileName;
  }

  getCompiledFileName(): string {
    return this?._compiledFileName;
  }

  getData(): string {
    return this?._data;
  }

  getWorkdir(): string {
    return this._workdir;
  }

  getCommand(): string {
    return this._command;
  }

  getDockerImage(): string {
    return this._dockerImage;
  }

  getFileName(): string {
    return this._fileName;
  }

  getContainerName(): string {
    return this._containerName;
  }
}
