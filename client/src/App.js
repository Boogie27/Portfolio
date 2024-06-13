import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Client from './components/client/Client'
import Admin from './components/admin/Admin'
import { page } from './File'




function App() {
  return (
    <div className="main-app">
        {
            page('dashboard') ? (<Admin/>) : (<Client/>)
        }
    </div>
  );
}

export default App;
