import Capsule, { Environment } from '@usecapsule/web-sdk';

export const capsule = new Capsule(
  Environment.DEVELOPMENT,
  process.env.REACT_APP_CAPSULE_API_KEY // this is not sensitive so passing inline for simplicity
);