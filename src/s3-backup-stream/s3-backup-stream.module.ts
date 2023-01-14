import { Module } from '@nestjs/common';
import { S3BackupStreamController } from './s3-backup-stream.controller';
import { S3BackupStreamService } from './s3-backup-stream.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [S3BackupStreamController],
  providers: [S3BackupStreamService]
})
export class S3BackupStreamModule {}
