import AppLayout from './layouts/AppLayout'
import Tickets from './pages/Tickets'
import UIProvider from './context/UIContext'

function App() {
  return (
    <UIProvider>
      <AppLayout>
        <Tickets />
      </AppLayout>
    </UIProvider>
  )
}

export default App
