'use client';

import React from 'react';
import { Amplify } from 'aws-amplify';
// import config from '@/amplifyconfiguration.json';
import awsExports from '@/aws-exports';
import config from '@/custom-aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(config, { ssr: true });
// Amplify.configure(awsExports, { ssr: true });

const Auth = ({ children }: { children: React.ReactNode }) => {
  console.log(
    'custom redirectSignIn URL (Auth.tsx):',
    config.oauth.redirectSignIn,
  );
  console.log('original redirectSignIn URL:', awsExports.oauth.redirectSignIn);
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};

export default Auth;
