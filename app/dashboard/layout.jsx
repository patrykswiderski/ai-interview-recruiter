import React from 'react'
import Header from './_components/Header'

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="mx-5 md:mx-20 lg:mx-36 h-min-screen">{children}</div>
    </div>
  )
}

export default DashboardLayout
