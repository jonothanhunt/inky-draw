import React, { useState, useEffect } from 'react';
import './App.css';
import Canvas from './components/Canvas';

function App()
{
  const [resolution, setResolution] = useState({
    width: 250,
    height: 122
  });

  const [specialColour, setSpecialColour] = useState('yellow')

  useEffect(() =>
  {
    fetch('/api/inky').then(res => res.json()).then(data =>
    {
      console.log(data.specialColor, data.resolution)
      setResolution({
        width: data.resolution[0],
        height: data.resolution[1]
      })
      setSpecialColour(data.specialColor)
    });
  }, []);

  return (
    <div className="App">
      <Canvas
        width={resolution.width}
        height={resolution.height}
        specialColor={specialColour}
      />
    </div>
  );
}

export default App;