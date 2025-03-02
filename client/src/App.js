import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Client from './components/client/Client'
import Admin from './components/admin/Admin'
import { page } from './File'
import { useState, useEffect, useRef } from 'react'



function App() {
  const toggelAppStateRef = useRef(null)
  const [appState, setAppState] = useState('')

  // set app to client or admin
  const toggleAppState = () => {
    if(page('dashboard')){
      setAppState('admin')
    }else{
      setAppState('client')
    }
  }
  
  toggelAppStateRef.current = toggleAppState

  useEffect(() => {
    toggelAppStateRef.current()
  }, [])

  return (
    <div className="main-app">
        { appState === 'admin' ? (<Admin setAppState={setAppState}/>) : null }
        { appState === 'client' ? (<Client setAppState={setAppState}/>) : null }
    </div>
  );
}

export default App;
