import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ChecklistCategoryProvider } from './contexts/ChecklistCategoryContext';
import { Navbar } from './components/navigation/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { ChecklistsPage } from './pages/checklists/ChecklistsPage';
import { ChecklistEditPage } from './pages/checklists/ChecklistEditPage';
import { ChecklistProgressPage } from './pages/checklists/ChecklistProgressPage';
import { UsersPage } from './pages/users/UsersPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { SystemConfigPage } from './pages/admin/SystemConfigPage';
import { AuditLogPage } from './pages/admin/AuditLogPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ChecklistCategoryProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboardPage />} allowedRoles={['admin']} />} />
            <Route path="/checklists" element={<ProtectedRoute element={<ChecklistsPage />} />} />
            <Route path="/checklists/edit/:id" element={<ProtectedRoute element={<ChecklistEditPage />} allowedRoles={['admin', 'contract_admin', 'preventionist']} />} />
            <Route path="/checklists/progress/:id" element={<ProtectedRoute element={<ChecklistProgressPage />} />} />
            <Route path="/reports" element={<ProtectedRoute element={<ReportsPage />} allowedRoles={['admin', 'preventionist']} />} />
            <Route path="/users" element={<ProtectedRoute element={<UsersPage />} allowedRoles={['admin']} />} />
            <Route path="/admin/system-config" element={<ProtectedRoute element={<SystemConfigPage />} allowedRoles={['admin']} />} />
            <Route path="/admin/audit-log" element={<ProtectedRoute element={<AuditLogPage />} allowedRoles={['admin']} />} />
            <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ChecklistCategoryProvider>
    </AuthProvider>
  );
}

export default App
