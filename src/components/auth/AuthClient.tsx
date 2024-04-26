'use client';
import 'src/styles/AuthStyles.css';
import { Authenticator, ThemeProvider, useTheme } from '@aws-amplify/ui-react';
import { ComponentOverrides, FormFieldsOverrides } from './AuthOverrides';
import { signUp, type SignUpInput } from 'aws-amplify/auth';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});

const loginTheme = {
  name: 'login-theme',
  tokens: {
    colors: {
      background: { primary: '#032436' },
      border: {
        primary: '#2B4A5C',
        secondary: '#2B4A5C',
      },
      font: {
        primary: '#FDFEFF',
        hover: '#FDFEFF',
        secondary: '#B1B5B8',
      },
    },

    components: {
      input: {},
      authenticator: {
        router: { borderWidth: '0', boxShadow: 'none' },
        form: { padding: '0px' },
        field: {},
      },
    },
  },
};

const AuthClient = () => {
  const { tokens } = useTheme();
  console.log(tokens);

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
    <div className={`bg-cardsDark ${sourceSans3.className} rounded-10 p-8 `}>
      <ThemeProvider theme={loginTheme}>
        <div className="mb-12">
          <p className="text-primary font-extralight leading-8">Welcome to</p>
          <h1
            className={`text-xl text-primary leading-8 ${sourceSans3.className}`}
          >
            Athletifi
          </h1>
        </div>

        <Authenticator
          components={ComponentOverrides}
          formFields={FormFieldsOverrides}
          services={services}
        />
      </ThemeProvider>
    </div>
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
