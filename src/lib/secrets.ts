import {
  SecretsManagerClientConfig,
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import path from 'node:path';
import fs from 'node:fs/promises';
import ini from 'ini';
import os from 'node:os';
import { hasShape, Shape } from './utils';

export async function getSecret(SecretId: string) {
  const config: SecretsManagerClientConfig = {
    region: process.env.NEXT_AWS_REGION || 'us-east-2',
    credentials: {
      accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY ?? '',
    },
  };

  if (process.env.NEXT_AWS_PROFILE) {
    const text = await fs.readFile(
      path.join(os.homedir(), '.aws', 'credentials'),
      { encoding: 'utf-8' },
    );
    const profile = process.env.NEXT_AWS_PROFILE;
    const credentials = ini.parse(text);
    if (!(profile in credentials)) {
      throw new Error(
        `~/.aws/credentials does not contain a profile named "${profile}"`,
      );
    }
    config.credentials = {
      accessKeyId: credentials[profile].aws_access_key_id ?? '',
      secretAccessKey: credentials[profile].aws_secret_access_key ?? '',
    };
  }

  const client = new SecretsManagerClient(config);
  return await client.send(new GetSecretValueCommand({ SecretId }));
}

export async function getSecretWithShape<S extends Shape>(
  SecretId: string,
  shape: S,
) {
  const { SecretString } = await getSecret(SecretId);
  if (!SecretString) {
    throw new Error('Secret is empty');
  }

  const secret = JSON.parse(SecretString);
  if (!hasShape(secret, shape)) {
    throw new Error('Malformed secret');
  }

  return secret;
}
