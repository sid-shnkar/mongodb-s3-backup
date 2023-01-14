import { Test, TestingModule } from '@nestjs/testing';
import { S3BackupStreamService } from './s3-backup-stream.service';

describe('S3BackupStreamService', () => {
  let service: S3BackupStreamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3BackupStreamService],
    }).compile();

    service = module.get<S3BackupStreamService>(S3BackupStreamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
