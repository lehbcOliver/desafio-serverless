import type { AWS } from '@serverless/typescript';



const serverlessConfiguration: AWS = {
  service: 'desafio',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { 
    todoList:{
      handler: 'src/todoList.handler',
      events: [{
        http: {
          path: 'todoList/{user_id}',
          method: 'post',
          cors: true
        }
      }]
    },
    getTodo: {
      handler: 'src/getTodo.handler',
      events: [{
        http: {
          path: 'getTodo/{user_id}',
          method: 'get',
          cors: true
        }
      }]
    }
   },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      stages: ['dev', 'lcoal'],
      start: {
        port: 8080,
        isMemory:true,
        migrate:true
      }
    }
  },
};

module.exports = serverlessConfiguration;
