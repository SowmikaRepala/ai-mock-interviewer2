import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Header from './_components/Header'

function DashboardLayout({ children }) {
  return (
    <div>
      <Header/>
      <div className='mx-5 md: nx-20  lg:mx-36'>
        {children}
      </div>
      
    </div>
  );
}

export default DashboardLayout;
