export interface CodeExecutorArgs {
  getData(): string;
  getCommand(): string;
  getDockerImage(): string;
  getFileName(): string;
  getCompiledFileName(): string;
  getContainerName(): string;
}
