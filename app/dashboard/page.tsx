import Dashboard from '@/components/Dashboard';
import AuthWrapper from '@/components/AuthWrapper';

export default function DashboardPage() {
  return (
    <AuthWrapper>
      <main className="min-h-screen bg-background">
        <Dashboard />
      </main>
    </AuthWrapper>
  );
}