import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'

const Login = lazy(() => import('../pages/Login.jsx'))
const Dashboard = lazy(() => import('../pages/Dashboard.jsx'))
const DatasetUpload = lazy(() => import('../pages/DatasetUpload.jsx'))
const Analysis = lazy(() => import('../pages/Analysis.jsx'))
const Visualizations = lazy(() => import('../pages/Visualizations.jsx'))
const AIChat = lazy(() => import('../pages/AIChat.jsx'))
// const Reports = lazy(() => import('../pages/Reports.jsx'))
const Settings = lazy(() => import('../pages/Settings.jsx'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/datasets" element={<DatasetUpload />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/visualizations" element={<Visualizations />} />
        <Route path="/chat" element={<AIChat />} />
        {/* <Route path="/reports" element={<Reports />} /> */}
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
