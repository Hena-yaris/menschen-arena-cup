import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from '../pages/Public/Home/Home'
import PublicLayout from '../layouts/PublicLayout'
// import AdminLayout from '../layouts/AdminLayout'

const AppRouter = () => {
  return (
    <>
      <Routes>
        {/**Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* * Admin Routes
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/teams" element={<Teams />} />
          <Route path="/admin/matches" element={<Matches />} />
          <Route path="/admin/topscorers" element={<TopScorers />} />
          <Route path="/admin/finals" element={<Finals />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default AppRouter