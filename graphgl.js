import { Amplify } from 'aws-amplify';


Amplify.configure({
    aws_appsync_graphqlEndpoint: 'https://level3-api.dev.easytrack.mx/graphql',
    aws_appsync_region: 'us-west-2',
    aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    graphql_headers: getGraphqlHeader,
  });
  export default Amplify;