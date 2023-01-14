import { Controller, Post } from '@nestjs/common';
import { S3BackupStreamService } from './s3-backup-stream.service';

@Controller('s3-backup-stream')
export class S3BackupStreamController {
    constructor(private readonly s3BackupStreamServiceService: S3BackupStreamService) {}

    @Post('/backup-database')
    public async backupDatabase() {
    return this.s3BackupStreamServiceService.backupDatabaseToS3();
  }
}