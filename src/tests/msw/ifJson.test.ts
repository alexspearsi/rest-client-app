import { describe, expect, it } from 'vitest';
import { ifJson } from '@/utils/ifJson';

describe('Test ifjson', () => {
  it('Should Return Right Data', () => {
    const data = '{"test": "123"}';
    const result = {
      test: '123',
    };
    expect(ifJson(data)).toBe(JSON.stringify(result, null, 2));
  });

  it('Should Return Right Data 2', () => {
    const data = { test: '123' };
    const result = {
      test: '123',
    };
    expect(ifJson(data)).toBe(JSON.stringify(result, null, 2));
  });

  it('Should Return Right Data 3', () => {
    const data = '{ "test": "123" []}';

    expect(ifJson(data)).toBe('{ "test": "123" []}');
  });
});
