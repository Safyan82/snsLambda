const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'AKIA6NJ4NY32IR7PIT5Y',
    secretAccessKey: 'j+QEeeS5YDPI3PzWkKeSUrj3tEsmPRSJVUVCMoCW',
    region: 'us-east-1', // Replace with your AWS region
});

const run = async (e, context) => {
  const sns = new AWS.SNS();
  const topicArn = 'arn:aws:sns:us-east-1:990653564660:boxSns'; // Replace with your SNS topic's ARN
//   const lambdaArn = context.invokedFunctionArn;

  
    // params for subsucriber
    const paramsSub = {
        Protocol: 'lambda',
        TopicArn: topicArn,
        Endpoint: 'arn:aws:lambda:us-east-1:990653564660:function:boxSnsTest', // Use the Lambda function's ARN
        // Endpoint: lambdaArn
    };

    //   params for publisher

    const paramsPub = {
        Message: 'This is a sample SNS notification from Lambda!',
        Subject: 'Lambda SNS Notification',
        TopicArn: topicArn, // Replace with your SNS topic's ARN
    };

  try {
    // subscriber
    // const subscription = await sns.subscribe(params).promise();
    // console.log('Subscribed successfully:', subscription);
    // return 'Subscribed successfully';

    // Publisher
    const result = await sns.publish(paramsPub).promise();
    console.log('Message sent:', result.MessageId);
    return 'Message sent successfully';
  } catch (error) {
    console.error('Error subscribing to SNS:', error);
    throw error;
  }
};
run();