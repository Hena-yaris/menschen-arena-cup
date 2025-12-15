import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from '../pages/Public/Home/Home'
import PublicLayout from '../layouts/PublicLayout'
import AdminLayout from '../layouts/AdminLayout'
import Standing from '../pages/Public/Standing'
import Fixtures from '../pages/Public/Fixtures'
import Teams from '../pages/Admin/Teams/Teams'
import Matches from '../pages/Admin/Matches/Matches'
import PlayerStats from '../pages/Public/playerStats'
import LatestMatchStats from '../pages/Public/LatestMatchStats'
import ScheduleEditor from '../pages/Admin/Matches/ScheduleEditor'
import TournamentReset from '../pages/Admin/Matches/TournamentReset'
import Knockout from '../pages/Public/Knockout'
// import AdminLayout from '../layouts/AdminLayout'

const AppRouter = () => {
  return (
    <>
      <Routes>
        {/**Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/standing" element={<Standing />} />
          <Route path="/playersLeader" element={<PlayerStats />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/knockout" element={<Knockout/>} />
          <Route path="/matchstatus" element={<LatestMatchStats/>} />
        </Route>

        {/**Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/teams" element={<Teams />} />
          <Route path="/admin/matches" element={<Matches />} />
          <Route path="/admin/schedule" element={<ScheduleEditor/>} />
          <Route path="/admin/reset" element={<TournamentReset/>} />
          
          {/* <Route path="/admin/finals" element={<Finals />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter