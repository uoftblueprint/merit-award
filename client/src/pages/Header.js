import React, { useState } from 'react'

const Header = () => {
  const [dashboardActive, setDashboardActive]
  return (
    <div className="w-full">
      <img className="inline-block" />
      <p>Application Portal</p>
      <a
        className={``}
      >Dashboard
      </a>
      <a>User Settings</a>

    </div>
  )
}

export default Header