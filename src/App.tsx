import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ChecklistCategoryProvider } from "./contexts/ChecklistCategoryContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { Sidebar } from "./components/navigation/Sidebar";
import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { ChecklistsPage } from "./pages/checklists/ChecklistsPage";
import { ChecklistEditPage } from "./pages/checklists/ChecklistEditPage";
import { ChecklistProgressPage } from "./pages/checklists/ChecklistProgressPage";
import { ReportsPage } from "./pages/reports/ReportsPage";
import { SystemConfigPage } from "./pages/admin/SystemConfigPage";
import { AuditLogPage } from "./pages/admin/AuditLogPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { JobPositionsPage } from "./pages/admin/JobPositionsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
// Importar páginas de gestión de usuarios
import UsersManagementPage from "./pages/admin/UsersManagementPage";
import UserCreatePage from "./pages/admin/UserCreatePage";
import UserEditPage from "./pages/admin/UserEditPage";
import UserDetailPage from "./pages/admin/UserDetailPage";

function App() {
  return (
    <AuthProvider>
      <ChecklistCategoryProvider>
        <NotificationProvider>
          <div className='min-h-screen bg-gray-50 flex'>
            <Sidebar />
            <main className='flex-1 ml-16 md:ml-64 transition-all duration-300'>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route
                  path='/dashboard'
                  element={<ProtectedRoute element={<DashboardPage />} />}
                />
                <Route
                  path='/admin/dashboard'
                  element={
                    <ProtectedRoute
                      element={<AdminDashboardPage />}
                      allowedRoles={["admin"]}
                    />
                  }
                />
                <Route
                  path='/checklists'
                  element={<ProtectedRoute element={<ChecklistsPage />} />}
                />
                <Route
                  path='/checklists/edit/:id'
                  element={
                    <ProtectedRoute
                      element={<ChecklistEditPage />}
                      allowedRoles={[
                        "admin",
                        "contract_admin",
                        "preventionist",
                      ]}
                    />
                  }
                />
                <Route
                  path='/checklists/progress/:id'
                  element={
                    <ProtectedRoute element={<ChecklistProgressPage />} />
                  }
                />
                <Route
                  path='/reports'
                  element={
                    <ProtectedRoute
                      element={<ReportsPage />}
                      allowedRoles={["admin", "preventionist"]}
                    />
                  }
                />

                <Route
                  path='/admin/system-config'
                  element={
                    <ProtectedRoute
                      element={<SystemConfigPage />}
                      allowedRoles={["admin"]}
                    />
                  }
                />
                <Route
                  path='/admin/audit-log'
                  element={
                    <ProtectedRoute
                      element={<AuditLogPage />}
                      allowedRoles={["admin"]}
                    />
                  }
                />
                <Route
                  path='/admin/job-positions'
                  element={
                    <ProtectedRoute
                      element={<JobPositionsPage />}
                      allowedRoles={["admin"]}
                    />
                  }
                />

                {/* Rutas de gestión de usuarios */}
                <Route
                  path='/admin/users'
                  element={
                    <ProtectedRoute
                      element={<UsersManagementPage />}
                      allowedRoles={["admin"]}
                    />
                  }
                />
                <Route
                  path='/admin/users/new'
                  element={
                    <ProtectedRoute
                      element={<UserCreatePage />}
                      allowedRoles={["admin"]}
                    />
                  }
                />
                <Route
                  path='/admin/users/edit/:userId'
                  element={
                    <ProtectedRoute
                      element={<UserEditPage />}
                      allowedRoles={["admin"]}
                    />
                  }
                />
                <Route
                  path='/admin/users/detail/:userId'
                  element={
                    <ProtectedRoute
                      element={<UserDetailPage />}
                      allowedRoles={["admin"]}
                    />
                  }
                />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </NotificationProvider>
      </ChecklistCategoryProvider>
    </AuthProvider>
  );
}

export default App;
