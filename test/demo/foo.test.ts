import test from 'ava';

import app from './app';

test('foo', (t) => {
  const ab = app.ab();

  t.is(ab, '123');
});

test('bar', async (t) => {
  const bar = Promise.resolve('bar');

  t.is(await bar, 'bar');
});