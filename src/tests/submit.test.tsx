import submitData from '@/components/api/submit-data';

import { describe, expect, it } from 'vitest';
import { mockSubmitObject, mockResult } from './__test__/mock-data';
import { cloneItWithoutKeys } from '@/utils/clone-it-without-keys';
import type { ResponseDataType } from '@/components/rest-client/types';

describe('Test Submit', () => {
  it('Should Return Right Data', async () => {
    const data: ResponseDataType | undefined =
      await submitData(mockSubmitObject);
    if (data) {
      const clone = cloneItWithoutKeys(data, ['time', 'start']);
      expect(clone).toEqual(mockResult);
    }
  });
});
