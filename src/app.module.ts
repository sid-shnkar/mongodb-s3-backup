import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { S3BackupStreamModule } from './s3-backup-stream/s3-backup-stream.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.dev'] }),
    DatabaseModule,
    S3BackupStreamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
