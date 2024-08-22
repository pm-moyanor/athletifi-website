import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import Header from '@/components/common/Header';
import '@testing-library/jest-dom';
import { NotificationPreferences } from '@/types/User.type';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Header Component', () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders the header with correct links', () => {
    render(<Header userData={null} />);

    const homeLink = screen.getByText('Home');
    const aboutUsLink = screen.getByText('About us');
    const blogLink = screen.getByText('Blog');
    const contactUsLink = screen.getByText('Contact Us');

    expect(homeLink).toBeInTheDocument();
    expect(aboutUsLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
    expect(contactUsLink).toBeInTheDocument();
  });

  it('navigates to the correct page when a link is clicked', () => {
    render(<Header userData={null} />);

    const aboutUsLink = screen.getByText('About us');
    fireEvent.click(aboutUsLink);

    expect(mockRouter.push).toHaveBeenCalledWith('/about-us');
  });

  it('navigates to the login page when "Log in" button is clicked', () => {
    render(<Header userData={null} />);

    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('navigates to the profile page when "My cards" link is clicked', () => {
    render(<Header userData={{ 
      name: 'John Doe',
      amplify_id: '',
      email: '',
      init_notifications: null,
      notifications: {} as NotificationPreferences,
      // Add the remaining required properties here
    }} />);

    const myCardsLink = screen.getByText('My cards');
    fireEvent.click(myCardsLink);

    expect(mockRouter.push).toHaveBeenCalledWith('/profile');
  });

  it('logs out the user when "Logout" link is clicked', () => {
    render(<Header userData={{ name: 'John Doe' }} />);

    const logoutLink = screen.getByText('Logout');
    fireEvent.click(logoutLink);

    expect(mockRouter.push).toHaveBeenCalledWith('/logout');
    expect(mockRouter.refresh).toHaveBeenCalled();
  });
});