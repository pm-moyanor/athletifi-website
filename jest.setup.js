import 'whatwg-fetch';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import { TextEncoder, TextDecoder } from 'util';

config({ path: ['.env.local', '.env'] });

if ('window' in global) {
  // Environment: jsdoc

  global.matchMedia =
    global.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };

  Object.assign(global, {
    TextEncoder,
    TextDecoder,
  });
}

// This is a hack to deal with the fact that Jest is apparently incapable of
// loading files as strings
jest.mock('@/lib/us-east-2-bundle.pem', () => {
  return fs
    .readFileSync(path.join(__dirname, 'src/lib/us-east-2-bundle.pem'))
    .toString('utf-8');
});
