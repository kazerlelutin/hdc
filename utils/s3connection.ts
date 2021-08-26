import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    CreateBucketCommand,
    ListBucketsCommand,
  } from "@aws-sdk/client-s3";
  import _ from "lodash";
  
  export default class S3 {
    s3Client: S3Client;
    bucketName: string;
  
    constructor(bucketName: string) {
      this.bucketName = bucketName;
      this.s3Client = new S3Client({
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_KEY,
          secretAccessKey: process.env.S3_PRIVATE,
        },
        endpoint: process.env.S3_ENDPOINT,
      });
    }
  
    async sendImage(
      folder: string,
      base64: String,
      fileName: string,
      tag: string
    ) {
      try {
        const link = `${folder}/${fileName}`;
        const   Bucket= await this.findOrCreateBucket();
        await this.s3Client.send(
          new PutObjectCommand({
            Bucket,
            ACL: "public-read",
            Key: link,
            ContentType: "image/webp",
            Body: Buffer.from(base64.split(",")[1], 'base64'),
            Tagging:tag,
          })
        );
        return `${process.env.S3_PUBLIC_ENDPOINT.replace("BUCKETNAME",this.bucketName)}/${link}`;
      } catch (e) {
        return e;
      }
    }
  
    async findOrCreateBucket(): Promise<string> {
      const Name = this.bucketName;
      try {
        const { Buckets } = await this.s3Client.send(new ListBucketsCommand({}));
        const bucketIsExist = _.find(Buckets, { Name });
        if (!bucketIsExist) {
         await this.s3Client.send(new CreateBucketCommand({ Bucket: Name}));
        }
  
      } catch (e) {
        throw new Error(e);
      }
      return Name;
    }
  
    async get(Key: string) {
      try {
        const Bucket= await this.findOrCreateBucket();
         await this.s3Client.send(
          new GetObjectCommand({
            Bucket,
            Key,
          })
        );
        return `${process.env.S3_PUBLIC_ENDPOINT.replace("BUCKETNAME",Bucket)}/${Key}`;
      } catch (e) {
        return undefined;
      }
    }
  }  