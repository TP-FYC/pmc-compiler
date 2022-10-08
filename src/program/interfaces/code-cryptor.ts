export interface CodeCryptor {
  decryption(encrypted: string): string;
  encryption(decrypted: string): string;
}
