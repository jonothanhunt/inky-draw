import { useEffect, useRef, useState } from 'react'
import './Canvas.css'

import { useOnDraw } from "./Hooks"

const Canvas = ({
    width,
    height
}) =>
{
    const canvasRef = useRef(null)

    // COLOUR
    const clearColour = '#E1D0C1'
    const inkySpecialColour = 'yellow'
    const [currentColor, setCurrentColor] = useState('black')

    const colourTable = {
        clear: clearColour,
        black: '#000000',
        special: inkySpecialColour === 'yellow' ? '#ffc400' : 'purple'
    }


    const { onMouseDown, setCanvasRef } = useOnDraw(onDraw, canvasRef)

    function onDraw(context, point, prevPoint)
    {
        drawLine(prevPoint, point, context, colourTable[currentColor], 2)
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

    return (
        <div className='hat-wrapper'>
            <div className='header-info'>
                Detected InkyPhat: YELLOW
            </div>
            <div className='controls'>
                <button onClick={() => { clearCanvas() }} className='controls-button'>Clear</button>

                <div className='controls-palette'>
                    <label className="controls-palette-option">
                        <input value="clear" className="clear" type="radio" name="radio-color" checked={currentColor === 'clear'} onChange={() => { setCurrentColor('clear') }} />
                    </label>

                    <label className="controls-palette-option">
                        <input value="black" className="black" type="radio" name="radio-color" checked={currentColor === 'black'} onChange={() => { setCurrentColor('black') }} />
                    </label>

                    <label className="controls-palette-option">
                        <input value={inkySpecialColour} className={inkySpecialColour} type="radio" name="radio-color" checked={currentColor === 'special'} onChange={() => { setCurrentColor('special') }} />
                    </label>
                </div>

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
                </div>
            </div>
        </div>
    )

}

export default Canvas