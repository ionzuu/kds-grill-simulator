// import { useEffect, useState } from 'react'
// import { socket } from './services/socket';
import './assets/styles/app.css'
import RoleSelection from './components/roleSelection';

function App() {
  // const [isConnected, setConnected] = useState(socket.connected);
  // useEffect(() => {
  //   function onConnect(){
  //     setConnected(1)
  //   }
  //   function onDisconnect(){
  //     setConnected(0);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //   };
  // }, []);

  return(
    <>
    <div className="MenuSelectormodal">
      <RoleSelection></RoleSelection>
    </div>
    </>
  )
  }

export default App
