import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BackToTopButton from './components/BackToTopButton'
import LandingPage from './pages/LandingPage'
import TallyOnCloud from './pages/TallyOnCloud'
import NotFound from './pages/NotFound'
import LifeAtHtwo from './pages/LifeAtHTwo'
import TallyOnAws from './pages/TallyOnAws'
import TallyDemoSection from './pages/TallyPrimeApplication'
import LinuxHostingSection from './pages/LinuxHosting'
import BusyOnCloud from './pages/BusyOnCloud'
import { ThemeProvider } from './contexts/ThemeContext'
import { ReadyToStartFooter } from './components/readyToStartFooter';
// import LogoCarousel from './components/logoCarousel'
import FloatingSupportButtons from './components/FloatingSupportButtons';
import { MargOnCloud } from './pages/MargOnCloud'
import { NavisionOnCloud } from './pages/NavisionOnCloud';
import { CloudForSapBone } from './pages/CloudForSapBOne'
import { WindowsHosting } from './pages/WindowsHosting'
import { VPSLinux } from './pages/VpsLinux'
import { VPSwindows } from './pages/VPSwindows'
import { DedicatedServer } from './pages/DedicatedServer'
import { StorageAsService } from './pages/StorageAsService'
import { BackupAndRecovery } from './pages/BackupAndRecovery'
import { DisasterServiceAsRecovery } from './pages/DisasterServiceAsRecovery'
import { JoinAsPartner } from './pages/JoinAsPartner'
import { GoogleWorkspace } from './pages/GoogleWorkspaces'
import { BusinessEmailZimbra } from './pages/BusinessEmailZimbra'
import LogoCarousel from './components/logoCarousel'
import { PartnerDashboard } from './pages/admin/PartnerDashboard'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/tally-on-cloud" element={<TallyOnCloud />} />
          <Route path='/get-in-touch' element={<LifeAtHtwo />} />
          <Route path='/tally-on-aws' element={<TallyOnAws />} />
          <Route path='/tally-prime-application' element={<TallyDemoSection />} />
          <Route path='/busy-on-cloud' element={<BusyOnCloud />} />
          <Route path='/linuxhosting' element={<LinuxHostingSection />} />
          <Route path='/marg-on-cloud' element={<MargOnCloud />} />
          <Route path="/navision-on-cloud" element={<NavisionOnCloud />} />
          <Route path='/sap-s4-hana-on-cloud' element={<CloudForSapBone />} />
          <Route path='/windowshosting' element={<WindowsHosting />} />
          <Route path='/vpslinux' element={<VPSLinux />} />
          <Route path='/vpswindows' element={<VPSwindows />} />
          <Route path='/dedicated-server' element={<DedicatedServer />} />
          <Route path='/storage-as-a-service' element={<StorageAsService />} />
          <Route path='/backup-recovery' element={<BackupAndRecovery />} />
          <Route path='/disaster-recovery-as-a-service' element={<DisasterServiceAsRecovery />} />
          <Route path='/join-as-a-partner' element={<JoinAsPartner />} />
          <Route path='/email' element={<GoogleWorkspace />} />
          <Route path='/email/business-zimbra' element={<BusinessEmailZimbra />} />
          <Route path='/user-admin' element={<PartnerDashboard/>} />
        </Routes>
        <LogoCarousel />
        <ReadyToStartFooter />
        <Footer />
        <BackToTopButton />
        <FloatingSupportButtons />
      </div>
    </ThemeProvider>
  )
}

export default App
