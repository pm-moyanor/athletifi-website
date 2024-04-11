export type AmplifyDependentResourcesAttributes = {
  "auth": {
    "athletifiDashboardLogin": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "GoogleWebClient": "string",
      "HostedUIDomain": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "OAuthMetadata": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "athletifiGeneralUsersGroupRole": "string",
      "athletifiReferralUsersGroupRole": "string",
      "athletifiTeamAdminUsersGroupRole": "string"
    }
  },
  "function": {
    "athletifiDashboardLoginCustomMessage": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "athletifiDashboardLoginPostConfirmation": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}