import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";



interface ITodo{
  title:string;
  deadline: Date;
}

export const handler: APIGatewayProxyHandler = async(event)=> {
  const {user_id} = event.pathParameters;
  const {title, deadline} = JSON.parse(event.body) as ITodo;

  try{
  await document.put({
    TableName: 'todo_list',
    Item: {
      id: '2d5d1c28-9661-40ee-80e1-93d7a7e9dab7',
      user_id,
      title,
      done: false,
      deadline: new Date(deadline)

    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify('Todo successfully added')
  }
}catch(error){
  return  {
    statusCode: 500,
    body: JSON.stringify('Ocorreu um erro ao criar a postagem.')
  };
}
}
