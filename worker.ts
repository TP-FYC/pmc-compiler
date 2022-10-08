import { parentPort, workerData } from 'worker_threads';
import { ProgramCodeCryptor } from './src/program/engines/program-code-cryptor';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const execSync = require('child_process').execSync;

function factorial(args: any): any {
  const codeCryptor = new ProgramCodeCryptor();
  const crypted = codeCryptor.encryption(args.data);
  try {
    const res = execSync(
      `docker container exec trustsandbox sh && docker run --stop-timeout=30 --rm ${args.dockerImage} /bin/sh -c "echo '${crypted}' > ${args.fileName} && ${args.command}"`,
      // {
      //   timeout: 30000,
      // },
    ).toString();
    console.log(
      `--- Compilation result start : ${new Date()} ---\n${res}\n --- Compilation result end : ${new Date()} ---`,
    );
    return {
      stdin: args.data,
      stdout: res,
    };
  } catch (e) {
    console.error('Exceeding process time... closing the compilation');
    return {
      stdin: args.data,
      stdout: 'Exceeding process time... closing the compilation',
    };
  }
}

parentPort.postMessage(factorial(workerData.value));
