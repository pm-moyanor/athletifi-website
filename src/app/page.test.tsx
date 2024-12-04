// src/app/page.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom';
import { getBlogList } from '@/utils/ApiHelper'; // Import the actual data fetching function
import { getUserData } from '@/app/utils/fetchHelper';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { BlogListResult } from '@/types/Api';
import { AuthData, UserData } from '@/types/User';

jest.mock('nextjs-toploader/app', () => ({
  useRouter: () => ({}), // fake router
}));

// Mock the data fetching functions and authentication
jest.mock('@/utils/ApiHelper', () => ({
  getBlogList: jest.fn(),
}));

jest.mock('@/app/utils/fetchHelper', () => ({
  getUserData: jest.fn(),
}));

jest.mock('@/app/utils/auth/amplify-utils', () => ({
  isAuthenticated: jest.fn(),
}));

jest.mock('@/app/actions/userDataActions', () => ({
  addUserPostSignIn: jest.fn(),
}));

describe('Home', () => {
  describe.skip('this test is broken', () => {
    it('renders the home page', async () => {
      // Mock data for `getBlogList`
      (getBlogList as jest.Mock).mockResolvedValue({
        allBlogList: {
          meta: {
            pagination: {
              page: 1,
              pageCount: 1,
              pageSize: 1,
              total: 1,
            },
          },
          data: [{ id: 1, title: 'Test Blog' }],
        }, // Provide some mock blog data
        allBlogListError: null,
      } as BlogListResult);

      // Mock data for `isAuthenticated` (assuming signed in)
      (isAuthenticated as jest.Mock).mockResolvedValue({
        isSignedIn: true,
        email: 'test@example.com',
        name: 'Test User',
        userId: '123',
      } as AuthData);

      // Mock data for `getUserData`
      (getUserData as jest.Mock).mockResolvedValue({
        // ... your mock user data
      } as UserData);

      // Home is an async component so we can't use the usual syntax
      render(await Home({ searchParams: {} }));

      // Assert that the loading message is initially displayed
      expect(screen.getByText('Loading blog list...')).toBeInTheDocument();

      // Wait for the blog list to load and the loading message to disappear
      await waitFor(() =>
        expect(
          screen.queryByText('Loading blog list...'),
        ).not.toBeInTheDocument(),
      );

      // Assert that a blog title is displayed (using the mock data)
      expect(screen.getByText('Test Blog')).toBeInTheDocument();

      // ... other assertions for components like FollowTomorrow, PassiveEngagement, etc.
    });
  });

  // Add more tests to cover different scenarios (e.g., error fetching blog list, user not signed in)
});
