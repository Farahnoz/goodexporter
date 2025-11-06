import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <>
      <Header />
      <AdminDashboard />
      <Footer />
    </>
  );
}