import { randomUUID } from 'crypto';

export function getUUID() {
  const token = randomUUID().split('-');
  [token[0], token[2]] = [token[2], token[0]];
  return token.join('');
}
