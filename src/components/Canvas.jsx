import { useEffect, useRef, useState } from 'react'
import './Canvas.css'
import piImage from '/images/raspberry-pi-4-model-b.svg'

import { useOnDraw } from "./DrawingHooks"

const Canvas = () =>
{
    // SET THINGS UP

    // Inky resolution state
    const [resolution, setResolution] = useState({
        width: 250,
        height: 122
    });

    // Inky special colour state
    const [specialColor, setSpecialColor] = useState(null)

    // Get and save resolution and special colour (to then make sure that if it is a special colour, that colour is available for drawing with)
    useEffect(() =>
    {
        initialise()
    }, []);

    function initialise()
    {
        setInkyConnectionError(false)
        fetch('/api/inky/initialise').then(res => res.json()).then(data =>
        {
            console.log(data.specialColor, data.resolution)
            setResolution({
                width: data.resolution[0],
                height: data.resolution[1]
            })
            setSpecialColor(data.specialColor)
        }).catch(error =>
        {
            setInkyConnectionError(true)
            console.log(error)
        })

        clearCanvas()

    }

    // Canvas ref
    const canvasRef = useRef(null)


    // SETUP BRUSH

    // Set clear colour (is the same as the CSS secondary colour variable)
    const clearColour = '#E1D0C1'

    // Currently selected colour state
    const [currentColor, setCurrentColor] = useState('black')

    // Colour table to get hex colour values
    const colourTable = {
        clear: clearColour,
        black: '#000000',
        special: specialColor === 'yellow' ? '#ffc400' : specialColor === 'red' ? '#bb0000' : '#000000'
    }

    // Brush size state
    const [brushSize, setBrushSize] = useState(5);

    // From drawing hooks: 
    //  inputs: 
    //      onMouseDown from canvas
    //      setCanvasRef from canvas
    //  ouputs:
    //      triggers onDraw function which includes the canvas context, current and previous points
    // canvas ref
    const { onMouseDown, setCanvasRef } = useOnDraw(onDraw, canvasRef)

    // On draw function (triggered via useOnDraw hook), which triggers drawLine function
    function onDraw(context, point, prevPoint)
    {
        drawLine(prevPoint, point, context)
    }

    // Draw line function
    function drawLine(start, end, context)
    {
        // When drawing a new line, avoid a line between the end of the last line and the new line eg. returns end if no start coordinates are given
        start = start ?? end;

        // Round linecap
        context.lineCap = "round";

        // Drawing the path
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
    }

    useEffect(() =>
    {
        const context = canvasRef.current.getContext('2d')

        const color = colourTable[currentColor]
        context.strokeStyle = color;
        context.fillStyle = color;

        context.lineWidth = brushSize;
    }, [currentColor, brushSize])


    // CANVAS CONTROL

    // Clear the canvas
    function clearCanvas()
    {
        const context = canvasRef.current.getContext('2d')
        context.fillStyle = clearColour
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    // Refreshing animation state (set when instructions sent to Inky)
    const [refreshingAnimation, setRefreshingAnimation] = useState(false)


    // INKY API

    // Connection error state (set to true if there is an error connecting to the API)
    const [inkyConnectionError, setInkyConnectionError] = useState(false)

    // Send image to Inky
    function sendToInky()
    {
        // Get image from canvas
        const imageData = canvasRef.current.toDataURL('image/png')

        // Send the image to the API
        fetch('/api/inky/set', {
            method: 'POST',
            body: JSON.stringify({ imageData }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(data =>
            {
                // Set refreshing animation
                setRefreshingAnimation(true)
                // Unset the refreshing animation after 10 seconds (usually takes 10-20seconds to refresh)
                setTimeout(function ()
                {
                    setRefreshingAnimation(false)
                }, 10000)
            })
            .catch(error =>
            {
                setInkyConnectionError(true)
                console.log(error)
            })
    }

    // CLEAR THE INKY
    function clearInky()
    {
        fetch('/api/inky/clear').then(res => res.json()).then(data =>
        {
            // Set refreshing animation
            setRefreshingAnimation(true)
            // Unset the refreshing animation after 10 seconds (usually takes 10-20seconds to refresh)
            setTimeout(function ()
            {
                setRefreshingAnimation(false)
            }, 10000)
        })
            .catch(error =>
            {
                setInkyConnectionError(true)
                console.log(error)
            })

    }

    return (
        <div className='wrapper'>
            <h1 className='title'>Inky Draw</h1>
            <div className='header-info'>
                {
                    inkyConnectionError ? 'It looks like there was an error connecting to the Python API. Try refreshing this page.' :
                        !specialColor ? 'Detecting Inky pHAT...' :
                            `Detected Inky pHAT: ${specialColor}`
                }
            </div>
            <div className='controls'>
                <button onClick={() => { clearCanvas() }} className='controls-button clear-button'>Clear</button>

                <div aria-label='brush colour' className='controls-palette'>
                    <label className="controls-palette-option">
                        <input value="clear" className="clear" type="radio" name="radio-color" checked={currentColor === 'clear'} onChange={() => { setCurrentColor('clear') }} />
                    </label>

                    <label className="controls-palette-option">
                        <input value="black" className="black" type="radio" name="radio-color" checked={currentColor === 'black'} onChange={() => { setCurrentColor('black') }} />
                    </label>

                    {!specialColor || specialColor != 'black' &&
                        <label className="controls-palette-option">
                            <input value={specialColor} className={specialColor} type="radio" name="radio-color" checked={currentColor === 'special'} onChange={() => { setCurrentColor('special') }} />
                        </label>
                    }
                </div>

                <div className='controls-brush'>
                    <input
                        className='controls-brush-size-slider'
                        aria-label='brush size'
                        type="range"
                        min="0.5"
                        max="50"
                        step={0.1}
                        value={brushSize}
                        onChange={(e) => setBrushSize(e.target.value)}
                    />
                </div>

            </div>

            <div className='hat-wrapper'>
                {/* <div className='pi-board'></div> */}
                <img className='pi-board' alt='' src={piImage}></img>
                <div
                    className={'hat'}
                >

                    <div className='hat-inner'>
                        <canvas
                            width={resolution.width}
                            height={resolution.height}
                            imageRendering='crisp-edges'

                            onMouseDown={onMouseDown}

                            className={'drawing-canvas'}

                            ref={canvasRef}
                        />
                        <div className={refreshingAnimation ? 'refreshing animating' : 'refreshing'}></div>
                    </div>
                </div>
            </div>
            <div className='controls'>
                <button onClick={() => { clearInky() }} className='controls-button clear-inky-button'>Clear Inky</button>

                <button onClick={() => { sendToInky() }} className='controls-button send-button'>Send to Inky</button>

            </div>
        </div>
    )

}

export default Canvas