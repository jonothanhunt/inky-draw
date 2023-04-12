import { useEffect, useRef, useState } from 'react'
import './Canvas.css'

import { useOnDraw } from "./Hooks"

const Canvas = ({
    width,
    height,
    specialColor
}) =>
{
    const canvasRef = useRef(null)

    // COLOUR
    const clearColour = '#E1D0C1'
    const [currentColor, setCurrentColor] = useState('black')

    const colourTable = {
        clear: clearColour,
        black: '#000000',
        special: specialColor === 'yellow' ? '#ffc400' : specialColor === 'red' ? '#bb0000' : '#000000'
    }


    const { onMouseDown, setCanvasRef } = useOnDraw(onDraw, canvasRef)

    function onDraw(context, point, prevPoint)
    {
        drawLine(prevPoint, point, context, colourTable[currentColor], 5)
    }

    function drawLine(
        start,
        end,
        context,
        color,
        width
    )
    {
        start = start ?? end

        context.imageSmoothingEnabled = false

        context.beginPath()
        context.lineWidth = width
        context.moveTo(start.x, start.y)
        context.lineTo(end.x, end.y)
        context.stroke()

        context.strokeStyle = color
        context.fillStyle = color
    }

    function clearCanvas()
    {
        const context = canvasRef.current.getContext('2d')
        context.fillStyle = clearColour
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    useEffect(() =>
    {
        clearCanvas()
    }, [])

    const [refreshingAnimation, setRefreshingAnimation] = useState(false)

    function sendToInky()
    {
        const imageData = canvasRef.current.toDataURL('image/png')

        fetch('/api/inky/set', {
            method: 'POST',
            body: JSON.stringify({ imageData }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(data =>
            {
                setRefreshingAnimation(true)
                setTimeout(function ()
                {
                    setRefreshingAnimation(false)
                }, 10000)
            })
            .catch(error =>
            {
                console.log(error)
            })

    }

    function clearInky()
    {
        fetch('/api/inky/clear').then(res => res.json()).then(data =>
        {
            setRefreshingAnimation(true)
            setTimeout(function ()
            {
                setRefreshingAnimation(false)
            }, 10000)
        })
            .catch(error =>
            {
                console.log(error)
            })

    }


    return (
        <div className='hat-wrapper'>
            <div className='header-info'>
                Detected Inky pHAT: {specialColor}
            </div>
            <div className='controls'>
                <button onClick={() => { clearCanvas() }} className='controls-button clear-button'>Clear</button>

                <div className='controls-palette'>
                    <label className="controls-palette-option">
                        <input value="clear" className="clear" type="radio" name="radio-color" checked={currentColor === 'clear'} onChange={() => { setCurrentColor('clear') }} />
                    </label>

                    <label className="controls-palette-option">
                        <input value="black" className="black" type="radio" name="radio-color" checked={currentColor === 'black'} onChange={() => { setCurrentColor('black') }} />
                    </label>

                    {specialColor != 'black' &&
                        <label className="controls-palette-option">
                            <input value={specialColor} className={specialColor} type="radio" name="radio-color" checked={currentColor === 'special'} onChange={() => { setCurrentColor('special') }} />
                        </label>
                    }
                </div>

                <button onClick={() => { clearInky() }} className='controls-button clear-inky-button'>Clear Inky</button>

                <button onClick={() => { sendToInky() }} className='controls-button send-button'>Send to Inky</button>

            </div>
            <div
                className={'hat'}
            >
                <div className='hat-inner'>
                    <canvas
                        width={width}
                        height={height}
                        imageRendering='crisp-edges'

                        onMouseDown={onMouseDown}

                        className={'drawing-canvas'}

                        // ref={setCanvasRef}
                        ref={canvasRef}
                    />
                    <div className={refreshingAnimation ? 'refreshing animating' : 'refreshing'}></div>
                </div>
            </div>
        </div>
    )

}

export default Canvas