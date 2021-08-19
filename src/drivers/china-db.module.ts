import { Module } from '@nestjs/common';
import { ChinaDbDriver } from './china-db';

@Module({
  providers: [ChinaDbDriver],
  exports: [ChinaDbDriver],
})
export class ChinaDbModule {}
