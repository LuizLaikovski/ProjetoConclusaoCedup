import { Outlet } from 'react-router-dom';

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