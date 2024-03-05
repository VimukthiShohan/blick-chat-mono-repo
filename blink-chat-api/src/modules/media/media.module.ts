import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
