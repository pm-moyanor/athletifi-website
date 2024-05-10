import Navbar from '@/components/dashboard/Navbar';
import { Provider } from 'jotai';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider>
        <Navbar />
        {children}
      </Provider>
    </>
  );
}
