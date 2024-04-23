'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import { ComponentOverrides, FormFieldsOverrides } from './AuthOverrides';

const AuthClient = () => {
  return (
    <Authenticator
      components={ComponentOverrides}
      formFields={FormFieldsOverrides}
    />
  );
};

export default AuthClient;
