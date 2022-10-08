import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramCodeExecutor } from './engines/program-code-executor';
import { ProgramCodeCryptor } from './engines/program-code-cryptor';
import { ProgramController } from './program.controller';

@Module({
  imports: [],
  providers: [
    ProgramService,
    ProgramController,
    ProgramCodeExecutor,
    ProgramCodeCryptor,
  ],
  exports: [ProgramService],
  controllers: [ProgramController],
})
export class ProgramModule {}
