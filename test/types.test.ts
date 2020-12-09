import { getTypes } from 'infer-types';
import path from 'path';

test('matcher type inference is correct', async () => {
  const types = getTypes(path.join(__dirname, './example.ts'));
  expect(types).toEqual({
    key: `"state"`,
    legKeys: `"loggedIn" | "guest" | "unauthorized"`,
    'guest.nickname': `"nice-ghost"`,
    'loggedIn.name': `"gal"`,
    'unauthorized.emptySession': `true`,
  });
});
