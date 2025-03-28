import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserInfo } from "./UserInfo";

export const Sidebar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen fixed left-0 top-0 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } z-10`}
    >
      <div className='flex items-center justify-between p-4 border-b border-gray-700'>
        {!isCollapsed && (
          <NavLink to='/' className='text-white font-bold text-xl'>
            CheckList Minero
          </NavLink>
        )}
        <button
          onClick={toggleSidebar}
          className='text-gray-300 hover:text-white focus:outline-none'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            {isCollapsed ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 5l7 7-7 7M5 5l7 7-7 7'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
              />
            )}
          </svg>
        </button>
      </div>

      {isAuthenticated && !isCollapsed && <UserInfo />}

      <div className='py-4'>
        {isAuthenticated ? (
          <nav className='space-y-2'>
            <NavLink
              to='/dashboard'
              className={({ isActive }) =>
                `flex items-center px-4 py-2 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                } transition-colors duration-200 ${
                  isCollapsed ? "justify-center" : ""
                }`
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              {!isCollapsed && <span className='ml-3'>Dashboard</span>}
            </NavLink>

            <NavLink
              to='/checklists'
              className={({ isActive }) =>
                `flex items-center px-4 py-2 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                } transition-colors duration-200 ${
                  isCollapsed ? "justify-center" : ""
                }`
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                />
              </svg>
              {!isCollapsed && <span className='ml-3'>Checklists</span>}
            </NavLink>

            {user &&
              (user.role === "admin" || user.role === "preventionist") && (
                <NavLink
                  to='/reports'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    } transition-colors duration-200 ${
                      isCollapsed ? "justify-center" : ""
                    }`
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                    />
                  </svg>
                  {!isCollapsed && <span className='ml-3'>Reportes</span>}
                </NavLink>
              )}

            {user && user.role === "admin" && (
              <>
                <NavLink
                  to='/admin/dashboard'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    } transition-colors duration-200 ${
                      isCollapsed ? "justify-center" : ""
                    }`
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  {!isCollapsed && <span className='ml-3'>Panel Admin</span>}
                </NavLink>

                <NavLink
                  to='/admin/job-positions'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    } transition-colors duration-200 ${
                      isCollapsed ? "justify-center" : ""
                    }`
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                  {!isCollapsed && (
                    <span className='ml-3'>Puestos de Trabajo</span>
                  )}
                </NavLink>

                <NavLink
                  to='/admin/users'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    } transition-colors duration-200 ${
                      isCollapsed ? "justify-center" : ""
                    }`
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                  {!isCollapsed && (
                    <span className='ml-3'>Gestión de Usuarios</span>
                  )}
                </NavLink>

                <NavLink
                  to='/admin/system-config'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    } transition-colors duration-200 ${
                      isCollapsed ? "justify-center" : ""
                    }`
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  {!isCollapsed && (
                    <span className='ml-3'>Configuración del Sistema</span>
                  )}
                </NavLink>

                <NavLink
                  to='/admin/audit-log'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    } transition-colors duration-200 ${
                      isCollapsed ? "justify-center" : ""
                    }`
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  {!isCollapsed && (
                    <span className='ml-3'>Auditoría y Monitoreo</span>
                  )}
                </NavLink>
              </>
            )}

            <div className='border-t border-gray-700 pt-2 mt-2'>
              <button
                onClick={logout}
                className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 w-full ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                  />
                </svg>
                {!isCollapsed && <span className='ml-3'>Cerrar Sesión</span>}
              </button>
            </div>
          </nav>
        ) : (
          <nav className='space-y-2'>
            <NavLink
              to='/login'
              className={({ isActive }) =>
                `flex items-center px-4 py-2 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                } transition-colors duration-200 ${
                  isCollapsed ? "justify-center" : ""
                }`
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                />
              </svg>
              {!isCollapsed && <span className='ml-3'>Iniciar Sesión</span>}
            </NavLink>

            <NavLink
              to='/register'
              className={({ isActive }) =>
                `flex items-center px-4 py-2 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                } transition-colors duration-200 ${
                  isCollapsed ? "justify-center" : ""
                }`
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                />
              </svg>
              {!isCollapsed && <span className='ml-3'>Registrarse</span>}
            </NavLink>
          </nav>
        )}
      </div>
    </div>
  );
};
