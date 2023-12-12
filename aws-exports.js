import { Amplify } from 'aws-amplify';


  Amplify.configure({
    Auth: {
      region: 'us-west-2',
      userPoolId: 'us-west-2_5BbQ1Fjev',
      userPoolWebClientId: '4gh8brl7pu36nve4hmmm3p4sro',
      authenticationFlowType: 'USER_SRP_AUTH',
    },
  });
  export default Amplify;
  
 