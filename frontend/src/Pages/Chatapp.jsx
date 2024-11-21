import {React,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftMenu from '../Components/Leftmenu';
import RightPanel from '../Components/Rightmenu';
import '../styles/mainpage.css';


function App() {
 
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="app-container">
      {/* Wrapper to center the glass-effect panels */}
      <div className="glass-wrapper glass-effect">
        {/* Left Menu */}
        <div className="left-menu">
           <LeftMenu setSelectedFriend={setSelectedFriend} />
        </div>

        {/* Chat Detail */}
        <div className="chat-detail">
        <RightPanel  selectedFriend={selectedFriend} />
        </div>
      </div>
    </div>
  );
}

export default App;
