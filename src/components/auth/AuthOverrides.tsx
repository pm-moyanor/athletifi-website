import {
  Button,
  Heading,
  Text,
  View,
  useAuthenticator,
  useTheme,
} from '@aws-amplify/ui-react';

export const ComponentOverrides = {
  Header() {
    return <div className="mt-40"></div>;
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; AthletiFi. All Rights Reserved.
        </Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      return <></>;
    },
    Footer() {
      const { toForgotPassword } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toForgotPassword}
            size="small"
            variation="link"
          >
            Reset Password
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      return <></>;
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      return <Heading level={3}>Confirm Sign-Up</Heading>;
    },
    Footer() {
      return <></>;
    },
  },
  SetupTotp: {
    Header() {
      return <Heading level={3}>Enter Information:</Heading>;
    },
    Footer() {
      return <></>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`0 0 ${tokens.space.xl} 0`} level={3}>
          Two-factor authentication
        </Heading>
      );
    },
    Footer() {
      return <></>;
    },
  },
  ForgotPassword: {
    Header() {
      return <Heading level={3}>Forgot Password</Heading>;
    },
    Footer() {
      return <></>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      return <Heading level={3}>Confirm Reset Password</Heading>;
    },
    Footer() {
      return <></>;
    },
  },
};

export const FormFieldsOverrides = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    name: {
      label: 'Full Name:',
      placeholder: 'Bruce Wayne',
      isRequired: true,
      order: 1,
    },
    email: {
      label: 'Email:',
      placeholder: 'bruce@wayne.ent',
      isRequired: true,
      order: 2,
    },
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password',
      isRequired: true,
      order: 3,
    },
    confirm_password: {
      label: 'Confirm Password:',
      isRequired: true,
      order: 4,
    },
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password:',
    },
  },
  forgotPassword: {
    username: {
      placeholder: 'Enter your email:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code:',
      label: 'Confirmation code',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTotp: {
    QR: {
      totpIssuer: 'AWSCognito',
      totpUsername: 'user.attributes.email',
    },
    confirmation_code: {
      label: '',
      placeholder: 'Enter your Authenticator Code',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: '',
      placeholder: 'Enter your Authenticator Code',
      isRequired: false,
    },
  },
};
