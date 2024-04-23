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
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Confirm Sign-Up
        </Heading>
      );
    },
    Footer() {
      return <></>;
    },
  },
  SetupTotp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <></>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Confirm Sign-In
        </Heading>
      );
    },
    Footer() {
      return <></>;
    },
  },
  ForgotPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Forgot Password
        </Heading>
      );
    },
    Footer() {
      return <></>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Confirm Reset Password
        </Heading>
      );
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
    // given_name: {
    //   label: 'First Name:',
    //   placeholder: 'Bruce',
    //   isRequired: true,
    //   order: 1,
    // },
    // family_name: {
    //   label: 'Last Name:',
    //   placeholder: 'Wayne',
    //   isRequired: true,
    //   order: 2,
    // },
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
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTotp: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};
