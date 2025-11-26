import { Outlet } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import './routes/css/Loader.css';

AOS.init();

function App() {

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>  
        <Outlet />
      </div>
    </>
  )
}

export default App