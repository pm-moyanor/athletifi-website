'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import { ComponentOverrides, FormFieldsOverrides } from './AuthOverrides';
import { signUp, type SignUpInput } from 'aws-amplify/auth';

const AuthClient = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';
  const postHelper = async (
    email: string | undefined,
    name: string | undefined,
  ) => {
    const response = await fetch(
      `${baseURL}/addUser?email=${email}&name=${name}`,
    );
    const data = await response.json();
    return data;
  };

  const services = {
    async handleSignUp(formData: SignUpInput) {
      if (formData?.options?.userAttributes) {
        const attributes = formData.options.userAttributes;
        await postHelper(attributes.email, attributes.name);
      }
      return signUp(formData);
    },
  };

  return (
    <Authenticator
      components={ComponentOverrides}
      formFields={FormFieldsOverrides}
      services={services}
    />
  );
};

export default AuthClient;

// {
//   "username": "louis@athleti.fi",
//   "password":"password123",
//   "options": {
//     "autoSignIn": true,
//     "userAttributes": {
//       "name": "Louis Choi",
//       "email":"louis@athleti.fi"
//     }
//   }
// }
