import { useState } from 'react'
import { Color } from '../../App'
import './Button.css'


interface ButtonProps {
    children?: React.ReactNode
    size: string,
    color?: Color
    onClick?: Function
    appearDelay?: number
    active?: boolean
    opacity?: number
    onMouseEnter?: Function | undefined
    onMouseLeave?: Function | undefined
    isValidMove?: boolean
    shaking?: boolean

}
function Button(props: ButtonProps) {
    const [__, setAnimating] = useState(false)
    const [active, setActive] = useState<boolean>(false)
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
    const shadowSize = () => {
        if (props.opacity == 0.5) {
            return '0.02em'
        }
        if (active) {
            return '0.01em'
        }
        return '0.03em'
    }
    const appearDelay = () => {
        if (props.appearDelay) {
            return props.appearDelay + 's'
        }
        return '0s'
    }
    const isValidMoveStyle = () => {
        if (props.isValidMove == undefined) {
            return ''
        } else {
            if (props.isValidMove) {
                return 'validMoveT'
            } else {
                return "validMoveF"
            }
        }
    }
    // const boarderColor = (): string => {
    //     const rgb = hexToRGB(color.secondary)
    //     return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    // }

    return (
        <>
            <button className={`primaryButton ${props.active ? 'selected' : ''} ${isValidMoveStyle()} ${props.shaking ? 'shake' : ''}`}
                style={{ borderColor: color.secondary, fontSize: props.size, color: color.secondary, backgroundColor: color.primary, boxShadow: `${shadowSize()} ${shadowSize()} ${shadowSize()} ${color.bottomShadow}, -${shadowSize()} -${shadowSize()} ${shadowSize()} ${color.topShadow}`, animationDelay: appearDelay(), opacity: props.opacity, animationName: props.appearDelay == 0 ? 'none' : 'appearAni' }}
                onPointerDown={() => { setActive(true); }}
                onPointerUp={() => { setActive(false) }}
                onPointerLeave={() => { setActive(false); props.onMouseLeave != undefined ? props.onMouseLeave() : () => { }; }}
                onPointerEnter={() => { props.onMouseEnter != undefined ? props.onMouseEnter() : () => { }; }}

                onClick={() => {
                    props.onClick != undefined ? props.onClick() : () => { }
                }}
                onAnimationStart={() => { setAnimating(true) }}
                onAnimationEnd={() => { setAnimating(false) }}

            >
                {props.children}
            </button >

        </>
    )
}

export default Button