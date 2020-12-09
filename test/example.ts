import { matcher } from '../src';

type ExtraIgnored = {
  random: string;
};

type User =
  | {
      state: 'loggedIn';
      name: 'gal';
      extra: ExtraIgnored;
    }
  | {
      state: 'guest';
      nickname: 'nice-ghost';
      extra: ExtraIgnored;
    }
  | {
      state: 'unauthorized';
      emptySession: true;
      extra: ExtraIgnored;
    };

const m1 = matcher<User>();

/** @export key */
const key: Parameters<typeof m1>[0] = 'state';

const m2 = m1(key);

/** @export legKeys */
const legKeys: keyof Parameters<typeof m2>[0] = '' as any;

ignore(legKeys);

m2({
  loggedIn(opts) {
    /** @export loggedIn.name */
    const arg = opts.name;
    ignore(arg);
  },
  unauthorized(opts) {
    /** @export unauthorized.emptySession */
    const arg = opts.emptySession;
    ignore(arg);
  },
  guest(opts) {
    /** @export guest.nickname */
    const arg = opts.nickname;
    ignore(arg);
  },
});

function ignore(_x: any): void {}
