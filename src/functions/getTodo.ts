import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";


interface ITodo {
  user_id:string;
  title:string;
  done: boolean;
  deadline:Date;
  
}

export const handler: APIGatewayProxyHandler = async(event)=> {
  const {id} = event.pathParameters;

  const response = await document.query({
    TableName: 'todo_list',
    KeyConditionExpression: 'id=:user_id',
    ExpressionAttributeValues: {':id':id}
  }).promise();

  const todo = response.Items[0] as ITodo;

  if(todo){
    return{
      statusCode: 200,
      body: JSON.stringify(todo)
    }
  }
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Todo not found'
    })
  }
}