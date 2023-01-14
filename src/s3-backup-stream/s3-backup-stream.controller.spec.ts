import { Test, TestingModule } from '@nestjs/testing';
import { S3BackupStreamController } from './s3-backup-stream.controller';

describe('S3BackupStreamController', () => {
  let controller: S3BackupStreamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3BackupStreamController],
    }).compile();

    controller = module.get<S3BackupStreamController>(S3BackupStreamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
