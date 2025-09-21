import { setupServer } from 'msw/node';
import { handlers } from './handles';

export const server = setupServer(...handlers);
