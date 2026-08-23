import { useEffect, useState } from 'react'
import { socket } from './services/socket';

function App() {
  const [isConnected, setConnected] = useState(socket.connected);
  useEffect(() => {
    function onConnect(){
      setConnected(1)
    }
    function onDisconnect(){
      setConnected(0);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return(
    <>
    <div>
      <h1>KDS Grill</h1>
      <p>
        Server Status: {' '}
        <strong style={{color: isConnected ? 'green' : 'red'}}>
          {isConnected ? 'Connected' :  'Disconnected'}
        </strong>
      </p>
    </div>
    </>
  )
  }

export default App
