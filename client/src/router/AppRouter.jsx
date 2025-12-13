import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from '../pages/Public/Home/Home'
import PublicLayout from '../layouts/PublicLayout'
import AdminLayout from '../layouts/AdminLayout'
import Standing from '../pages/Public/Standing'
import Fixtures from '../pages/Public/Fixtures'
import ManOfTheMatch from '../pages/Public/ManOfTheMatch'
import TopScorers from '../pages/Public/TopScorers'
import Teams from '../pages/Admin/Teams/Teams'
import Matches from '../pages/Admin/Matches/Matches'
// import AdminLayout from '../layouts/AdminLayout'

const AppRouter = () => {
  return (
    <>
      <Routes>
        {/**Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/standing" element={<Standing />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/motm" element={<ManOfTheMatch />} />
          <Route path="/topscorers" element={<TopScorers />} />
        </Route>

        {/**Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/teams" element={<Teams />} />
          <Route path="/admin/matches" element={<Matches />} />
          {/* <Route path="/admin/topscorers" element={<TopScorers />} /> */}
          {/* <Route path="/admin/topscorers" element={<Goa />} /> */}
          {/* <Route path="/admin/finals" element={<Finals />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter