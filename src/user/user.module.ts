import { Module } from '@nestjs/common';
import { ChinaDbDriver } from 'src/drivers/china-db';
import { ChinaDbModule } from 'src/drivers/china-db.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'ChinaDbDriver', useClass: ChinaDbDriver },
  ],
})
export class UserModule {}
