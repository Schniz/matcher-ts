import { matcher, matcherOptional } from '../src';

type State =
  | { state: 'unknown' }
  | { state: 'first'; payload: string }
  | { state: 'second'; payload: number };

it('matches the correct item', () => {
  expect.assertions(1);
  const m = matcher<State>()('state')({
    first({ payload }) {
      expect(payload.toUpperCase()).toBe('HELLO');
    },
    second() {
      fail(`Should not get here`);
    },
    unknown() {
      fail(`Should not get here`);
    },
  });

  m({ state: 'first', payload: 'hello' });
});

it('returns null on missing items', () => {
  const m = matcherOptional<State>()('state')({
    second() {
      fail(`Should not get here`);
    },
    unknown() {
      fail(`Should not get here`);
    },
  });

  expect(m({ state: 'first', payload: 'hello' })).toBe(undefined);
});
