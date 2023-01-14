import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import * as AWS from 'aws-sdk';
import * as stream from 'stream';
var JSONStream = require('JSONStream');

@Injectable()
export class S3BackupStreamService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly db: Db) {}

  public async backupDatabaseToS3() {
    // storing the details of all collections in an array
    const collectionsArray = await this.db.listCollections().toArray();
 
    // storing the names of the collections separately
    var collectionNames = [];

    collectionsArray.forEach((item) => {
      collectionNames.push(item.name);
    });

    const bucketName = process.env.S3_BUCKET;

    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_KEY,
    });

    const uploadStream = (s3: AWS.S3, Bucket: string, Key: string) => {
      const passT = new stream.PassThrough();
      return {
        writeStream: passT,
        promise: s3.upload({ Bucket, Key, Body: passT }).promise(),
      };
    };

   // stroing all the promises in an array
    var promisesArray = [];

    //looping through all collections in the database
    for (const item of collectionNames) {
    // key consists of database name and timestamp at the time of uploading
      const key = `${
        process.env.DATABASE_NAME
      } - ${new Date().toUTCString()}/${item}.json`;
      
      // creating a write stream for streaming data to AWS S3
      const { writeStream, promise } = uploadStream(s3, bucketName, key);

     /* 
      find() query returns a cursor(pointer) which points to the documents
      of the collection
     */
      const mongodbCursor = await this.db.collection(item).find({});
      
     /*
       piping data from the MongoDB cursor, through the JSON stringifier, and 
       finally into the write stream
     */
      mongodbCursor.stream().pipe(JSONStream.stringify()).pipe(writeStream);
      
      promisesArray.push(promise);
    }

    return Promise.all(promisesArray)
      .then((response) => {
        return `Successfully completed the database backup process!`;
      })
      .catch((error) => {
        return `Error! Could not complete the database backup process. ${error}`;
      });

  }
}