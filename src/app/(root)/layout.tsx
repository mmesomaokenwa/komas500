import Footer from '@/components/Footer/Footer';
import AppHeader from '@/components/Headers/AppHeader';
import NavHeader from '@/components/Headers/NavHeader';
import React from 'react'

const RootLayout = ({
  children,
  modal
}: {
  children: React.ReactNode,
  modal: React.ReactNode
}) => {
  return (
    <>
      <AppHeader />
      <NavHeader />
      {modal}
      {children}
      <Footer />
    </>
  );
}

export default RootLayout