import { useOnDraw } from "./Hooks"

const Canvas = ({
    width,
    height
}) =>
{
    const { onMouseDown, setCanvasRef } = useOnDraw(onDraw)

    function onDraw(context, point, prevPoint)
    {
        drawLine(prevPoint, point, context, '#000000', 1)
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
        context.strokeStyle = color;
        context.moveTo(start.x, start.y)
        context.lineTo(end.x, end.y)
        context.stroke()

        context.fillStyle = '#000000'
        context.beginPath();
        context.arc(start.x, start.y, width / 2, 0, 2 * Math.PI)
        context.fill()
    }

    return (
        <canvas
            width={width}
            height={height}
            imageRendering='crisp-edges'

            onMouseDown={onMouseDown}

            style={{
                border: "1px solid black",
                width: '60vw',
                imageRendering: 'pixelated',
                imageSmoothingEnabled: 'false',
                aspectRatio: width / height
            }}

            ref={setCanvasRef}
        />
    )

}

export default Canvas