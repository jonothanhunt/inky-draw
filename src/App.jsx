import React, { useState, useEffect } from 'react';
import './App.css';
import Canvas from './components/Canvas';

function App()
{
  // const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() =>
  // {
  //   fetch('/api/test').then(res => res.json()).then(data =>
  //   {
  //     setCurrentTime(data.time);
  //     console.log(data.time)
  //   });
  // }, []);

  const inkyDimensions = {
    width: 250,
    height: 122
  }

  return (
    <div className="App">
      <Canvas
        width={inkyDimensions.width}
        height={inkyDimensions.height}
      />
    </div>
  );
}

export default App;