import { CodeCryptor } from '../interfaces/code-cryptor';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProgramCodeCryptor implements CodeCryptor {
  decryption(encrypted: string): string {
    return Buffer.from(encrypted, 'base64').toString('ascii');
  }

  encryption(decrypted: string): string {
    return Buffer.from(decrypted).toString('base64');
  }
}
