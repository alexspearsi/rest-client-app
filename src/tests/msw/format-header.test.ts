import { describe, expect, it } from 'vitest';

import { formatHeader } from '@/utils/format-header';

describe('Test FormatBytes', () => {
  it('Should Return Right Data', () => {
    const data = 'some string';

    expect(formatHeader(data)).toBe('some-string');
  });
});
