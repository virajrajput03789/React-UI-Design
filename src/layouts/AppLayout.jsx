import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen">
          <Header />
          <main className="px-6 md:px-8 lg:px-10 py-6 max-w-7xl mx-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
