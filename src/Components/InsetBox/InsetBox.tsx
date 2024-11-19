import React, { useState } from 'react'
import './InsetBox.css'
import { Color } from '../../App'
interface InsetBoxProps {
    color?: Color
    children?: React.ReactNode
    height: string
    width: string
}

function InsetBox(props: InsetBoxProps) {

    const [color, _] = useState<Color>(() => {
        if (props.color != undefined) {
            return props.color
        }
        const newColor: Color = {
            name: 'Defualt Color',
            primary: 'var(--primary)',
            secondary: 'var(--secondary)',
            topShadow: 'var(--topShadow)',
            bottomShadow: 'var(--bottomShadow)',
            id: 0
        }
        return newColor
    })

    const shadowHeight = '0.2em'


    return (
        <>
            <div className='insetBox' style={{ boxShadow: `inset ${shadowHeight} ${shadowHeight} ${shadowHeight} ${color.bottomShadow}, inset -${shadowHeight} -${shadowHeight} ${shadowHeight} ${color.topShadow}`, height: props.height, width: props.width }}>
                {props.children}
            </div>
        </>
    )
}

export default InsetBox