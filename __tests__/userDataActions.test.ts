// userDataActions.test.ts

import { addUserPostSignIn } from '@/app/actions/userDataActions';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Success' }),
  })
) as jest.Mock;

describe('addUserPostSignIn', () => {
  it('should call the API with correct parameters', async () => {
    const email = 'test@example.com';
    const name = 'Test User';
    const userId = '123';
    const inviteId = 'invite123';

    await addUserPostSignIn(email, name, userId, inviteId);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/addUser'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify({
          amplify_id: userId,
          email: email,
          name: name,
          invite_id: inviteId,
        }),
      })
    );
  });

  it('should handle the case when inviteId is undefined', async () => {
    const email = 'test@example.com';
    const name = 'Test User';
    const userId = '123';

    await addUserPostSignIn(email, name, userId);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/addUser'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify({
          amplify_id: userId,
          email: email,
          name: name,
        }),
      })
    );
  });

  // Add more tests for error handling if necessary
});