import Button from '../../../Components/Button/Button'
import { ArrowAniIcon, TileIcon } from './Icons/Icons'
import './Tile.css'

interface TileProps {
    tileType: number
    appearDelay: number
    onClick: Function
    id: number[]
    setHovered: Function
    hoverId: number[] | undefined
    selectedId: number[] | undefined
    isValidMove: boolean
    shaking: boolean

}


function Tile(props: TileProps) {

    const isMouseInside = (isInside: boolean) => {
        if (isInside == true) {

            props.setHovered(props.id)
        }

    }
    const shouldBeActive = (): { bool: boolean, angle: number } => {
        if (!props.isValidMove) {
            return { bool: false, angle: 0 }
        }
        if (props.selectedId != undefined && props.hoverId != undefined) {

            const rowDiff = props.selectedId[0] - props.hoverId[0]
            const colDiff = props.selectedId[1] - props.hoverId[1]

            if (Math.abs(rowDiff) > Math.abs(colDiff)) {
                //rows
                if (rowDiff > 0) {
                    if (props.selectedId[1] == props.id[1] && props.selectedId[0] > props.id[0] && props.hoverId[0] < props.id[0]) {

                        return { bool: true, angle: 180 }
                    }
                } else {
                    if (props.selectedId[1] == props.id[1] && props.selectedId[0] < props.id[0] && props.hoverId[0] > props.id[0]) {

                        return { bool: true, angle: 0 }
                    }
                }
            } else {
                //colls
                if (colDiff > 0) {
                    if (props.selectedId[0] == props.id[0] && props.selectedId[1] > props.id[1] && props.hoverId[1] < props.id[1]) {

                        return { bool: true, angle: 90 }
                    }
                } else {
                    if (props.selectedId[0] == props.id[0] && props.selectedId[1] < props.id[1] && props.hoverId[1] > props.id[1]) {

                        return { bool: true, angle: 270 }
                    }
                }
            }

        }
        return { bool: false, angle: 0 }
    }

    const iconShown = () => {
        const active = shouldBeActive()
        if (active.bool) {
            return ArrowAniIcon(active.angle)
        } else {
            return TileIcon[props.tileType]
        }
    }

    return (
        <>
            <Button key={props.id + "TILeFUNc"}

                size='4em'
                appearDelay={props.appearDelay * 0.10}
                active={props.id.toString() == props.selectedId?.toString() ? true : false}
                onClick={props.onClick}
                onMouseEnter={() => { isMouseInside(true) }}
                onMouseLeave={() => { }}
                isValidMove={props.hoverId?.toString() == props.id.toString() ? props.isValidMove : undefined}
                shaking={props.shaking}
                opacity={props.tileType == 4 ? 0 : 1}
            >
                {

                    iconShown()
                }
            </Button>
        </>
    )
}


export default Tile