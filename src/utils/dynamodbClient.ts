import {DynamoDB} from 'aws-sdk';


const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8080',
  acessKeyId: 'x',
  secretAccessKey: 'x'
}

const isOffline = () => {
  return process.env.IS_OFFLINE;
}

export const document = isOffline() ? new DynamoDB.DocumentClient(options) : new DynamoDB.DocumentClient();