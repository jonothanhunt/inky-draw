import { useEffect, useRef } from "react";

export function useOnDraw(onDraw, canvasRef)
{
    // const canvasRef = useRef(null)
    const prevPointRef = useRef(null)
    const isDrawingRef = useRef(false)

    const mouseMoveListenerRef = useRef(null)
    const mouseUpListenerRef = useRef(null)

    useEffect(() =>
    {
        function initMouseMoveListener()
        {
            const mouseMoveListener = (e) =>
            {
                if (isDrawingRef.current)
                {
                    const point = computePointInCanvas(e.clientX, e.clientY)
                    // const context = canvasRef.current.getContext('2d')
                    const context = canvasRef.current.getContext('2d')
                    if (onDraw) { onDraw(context, point, prevPointRef.current) }
                    prevPointRef.current = point;

                }
            }
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener("mousemove", mouseMoveListener)

        }

        function initMouseUpListener()
        {
            if (!canvasRef.current) { return }
            const listener = () =>
            {
                isDrawingRef.current = false
                prevPointRef.current = null
            }
            mouseUpListenerRef.current = listener
            window.addEventListener("mouseup", listener)
        }

        function computePointInCanvas(clientX, clientY)
        {
            if (canvasRef.current)
            {
                const boundingRect = canvasRef.current.getBoundingClientRect()

                // adjust for position
                let x = clientX - boundingRect.left
                let y = clientY - boundingRect.top

                // adjust for scale
                const scaleWidth = boundingRect.width / canvasRef.current.width
                const scaleHeight = boundingRect.height / canvasRef.current.height

                x /= scaleWidth
                y /= scaleHeight

                return {
                    x: x,
                    y: y
                }
            } else
            {
                return null
            }

        }

        function removeListeners()
        {
            if (mouseMoveListenerRef.current)
            {
                window.removeEventListener("mousemove", mouseMoveListenerRef.current)
            }
            if (mouseUpListenerRef.current)
            {
                window.removeEventListener("mouseup", mouseUpListenerRef.current)
            }

        }

        initMouseMoveListener()
        initMouseUpListener()

        return () =>
        {
            removeListeners
        }
    }, [onDraw])

    // function setCanvasRef(ref)
    // {
    //     canvasRef.current = ref
    // }

    function onMouseDown()
    {
        isDrawingRef.current = true
    }

    return {
        // setCanvasRef,
        onMouseDown
    }
}