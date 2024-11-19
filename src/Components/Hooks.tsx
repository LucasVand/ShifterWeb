import { useEffect, useState } from 'react';

export const useMouseDown = () => {
    const [mouseDown, setMouseDown] = useState(false)

    useEffect(() => {
        document.addEventListener('pointerup', () => { setMouseDown(false) })
        document.addEventListener('pointerdown', () => { setMouseDown(true) })

        return () => {
            document.removeEventListener('pointerup', () => { setMouseDown(false) })
            document.removeEventListener('pointerdown', () => { setMouseDown(true) })
        }
    }, [])
    return mouseDown
}