
import { useLocation, useNavigate } from 'react-router'
import InsetBox from '../../Components/InsetBox/InsetBox'
import './BoardPage.css'
import { useEffect, useState } from 'react'
import { Area, Level, useLevelContext } from '../../LevelDataContext'
import Tile from './Tile/Tile'
import Button from '../../Components/Button/Button'
import { BackArrow } from '../AreaPage/Icons'
import { RestartArrowIcon } from './Icons'
import { useMouseDown } from '../../Components/Hooks'
import LevelMakerSection from './LevelMakerSection/LevelMakerSection'
import LevelComplete from '../../Components/LevelComplete/LevelComplete'


function BoardPage() {
    const navigation = useNavigate()
    var location = useLocation()
    const mouseDown = useMouseDown()
    const levelContext = useLevelContext()
    const [levelComplete, setLevelComplete] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [level, setLevel] = useState<Level>(location.state.level)
    const [hasRendered, setHasRendered] = useState(false)
    const [hoverId, setHoverId] = useState<number[] | undefined>(undefined)
    const [selectedId, setSelectedId] = useState<number[] | undefined>(undefined)
    const [shaking, setShaking] = useState(false)

    //returns a parsed layout from the level
    const resetLayout = (layout: string): number[][] => {
        var returnArr: number[][] = []
        const layoutStr: string = layout
        const layoutStrArr: string[] = layoutStr.split(',')

        layoutStrArr.forEach((str) => {
            const letters: string[] = str.split('')
            const lettersNum: number[] = letters.map((letter) => Number(letter))
            returnArr.push(lettersNum)
        })

        return returnArr
    }
    const [levelLayout, setLevelLayout] = useState<number[][]>(resetLayout(location.state.level.layout))
    //shakes the tiles
    const shake = () => {
        setShaking(true)
        setTimeout(() => {
            setShaking(false)
        }, 500)
    }

    //adds listeners
    useEffect(() => {
        document.addEventListener('pointerup', mouseUpFunc)
        document.addEventListener("pointerdown", (e: any) => e.target.releasePointerCapture(e.pointerId))
        setHasRendered(true)
        return () => {
            document.removeEventListener('pointerup', mouseUpFunc)
            document.removeEventListener("pointerdown", (e: any) => e.target.releasePointerCapture(e.pointerId))
        }
    }, [hoverId, selectedId])

    //calculates columns for grid
    const columns = () => {
        var returnStr = ''
        levelLayout[0].forEach(() => {
            returnStr += "1fr "
        })
        return returnStr
    }
    //calcuates rows for grid
    const rows = () => {
        var returnStr = ''
        levelLayout.forEach(() => {
            returnStr += "1fr "
        })
        return returnStr
    }
    const completedLevel = () => {
        const levelCopy = { ...level }
        levelCopy.complete = true
        levelContext.setLevel(levelCopy)
    }

    //called when the pointer is released
    const mouseUpFunc = () => {

        //this is where moving logic should be implimented
        if (isValidMove() && hoverId != undefined && selectedId != undefined) {
            //need to make the new board
            const levelLayoutCopy = [...levelLayout]
            levelLayoutCopy[hoverId[0]][hoverId[1]] = selectedId[2]
            levelLayoutCopy[selectedId[0]][selectedId[1]] = 0
            const complete = checkIfComplete(levelLayoutCopy)
            setLevelComplete(complete)
            if (complete) {
                completedLevel()
            }
            setLevelLayout(levelLayoutCopy)
        }
        //resets selected and hover
        setSelectedId(undefined)
        setHoverId(undefined)
    }


    const checkIfComplete = (layout: number[][]) => {
        var flag = 0
        layout.forEach((row: number[]) => {
            row.forEach((tileType: number) => {
                if (tileType != 0) {
                    flag++
                }
            })
        })
        if (flag == 1) {
            return true
        } else {
            return false
        }
    }
    //sets the hoverId, called when the pointer moves into a new tile
    const setHoverIdFunc = (id: number[]) => {
        //doesnt set selected if its on a blank or view finder tile
        const cantGrabNumber = [0, 3, 4]
        if (mouseDown && selectedId != undefined && cantGrabNumber.findIndex((num) => num == selectedId[2]) == -1) {
            const firstValidMove = isValidMoveReturnFirstValidTile(id)
            if (firstValidMove != undefined) {

                setHoverId(firstValidMove)
            } else {
                setHoverId(id)
            }
        } else {
            setSelectedId(id)
            setHoverId(undefined)
        }
    }
    //blank - 0
    //square - 1
    //triangle - 2
    //viewfinder - 3
    //missing - 4

    //returns whether the current move is valid
    const isValidMove = (): boolean => {
        //if not hovering or not selected we know it in in valid movev
        if (hoverId == undefined || selectedId == undefined) {
            return false
        }
        //if not same row or col them false
        if (hoverId[0] != selectedId[0] && hoverId[1] != selectedId[1]) {

            return false
        }
        //if its the same tile then false
        if (hoverId.toString() == selectedId.toString()) {

            return false
        }
        //if the tile tried to move it a viewfinder then false
        if (selectedId[2] == 3) {

            return false
        }
        //calculates the difference to find the direction
        const rowDiff = selectedId[0] - hoverId[0]
        const colDiff = selectedId[1] - hoverId[1]
        var loopInfo = { sign: 0, dir: 0 }
        if (Math.abs(rowDiff) > Math.abs(colDiff)) {
            loopInfo = { sign: Math.sign(rowDiff), dir: 0 }
        } else {
            loopInfo = { sign: Math.sign(colDiff), dir: 1 }
        }

        for (let i = selectedId[loopInfo.dir]; loopInfo.sign > 0 ? i > hoverId[loopInfo.dir] : i < hoverId[loopInfo.dir]; i = i - loopInfo.sign) {
            const currentTile = loopInfo.dir == 0 ? levelLayout[i][selectedId[1]] : levelLayout[selectedId[0]][i]

            if (currentTile == 4) {
                return false
            }
            if (currentTile != selectedId[2] && currentTile != 0) {
                return false
            }
        }

        if (selectedId[2] != hoverId[2] && selectedId[2] != 0 && hoverId[2] != 0) {
            return true
        }
        return false
    }
    //finds the first tile that is a valid move inbetween selectedID and HoverId
    const isValidMoveReturnFirstValidTile = (hoverId: number[]): undefined | number[] => {
        //if not hovering or not selected we know it in in valid movev
        if (hoverId == undefined || selectedId == undefined) {
            return undefined
        }
        //if not same row or col them false
        if (hoverId[0] != selectedId[0] && hoverId[1] != selectedId[1]) {

            return undefined
        }
        //if its the same tile then false
        if (hoverId.toString() == selectedId.toString()) {

            return undefined
        }
        //if the tile tried to move it a viewfinder then false
        if (selectedId[2] == 3) {

            return undefined
        }
        //calculates the difference to find the direction
        const rowDiff = selectedId[0] - hoverId[0]
        const colDiff = selectedId[1] - hoverId[1]
        var loopInfo = { sign: 0, dir: 0 }
        if (Math.abs(rowDiff) > Math.abs(colDiff)) {
            loopInfo = { sign: Math.sign(rowDiff), dir: 0 }
        } else {
            loopInfo = { sign: Math.sign(colDiff), dir: 1 }
        }

        for (let i = selectedId[loopInfo.dir]; loopInfo.sign > 0 ? i > hoverId[loopInfo.dir] : i < hoverId[loopInfo.dir]; i = i - loopInfo.sign) {
            const currentTile = loopInfo.dir == 0 ? levelLayout[i][selectedId[1]] : levelLayout[selectedId[0]][i]
            const pos = loopInfo.dir == 0 ? [i, selectedId[1]] : [selectedId[0], i]
            if (currentTile == 4) {
                return undefined
            }
            if (currentTile != selectedId[2] && currentTile != 0) {
                return [...pos, currentTile]
            }
        }
        return undefined
    }
    //when a tile is clicked
    const onClick = (id: number[]) => {
        if (location.state.isLevelMaker && editMode) {
            const levelLayoutCopy = [...levelLayout]
            levelLayoutCopy[id[0]][id[1]] += 1
            if (levelLayoutCopy[id[0]][id[1]] > 4) {
                levelLayoutCopy[id[0]][id[1]] = 0
            }
            setLevelLayout(levelLayoutCopy)

        }
    }
    //the list of tiles
    //just awful looking
    const tiles = levelLayout.map((row: number[], index1: number) => {
        return (
            <>
                {row.map((tile: number, index2: number) => {
                    const id = [index1, index2, tile]
                    return <Tile key={id + "Tile"}
                        onClick={() => { onClick(id) }}
                        appearDelay={!hasRendered ? index1 + index2 : 0}
                        tileType={tile}
                        id={id}
                        setHovered={setHoverIdFunc}
                        hoverId={hoverId}
                        selectedId={selectedId}
                        isValidMove={isValidMove()}
                        shaking={shaking}
                    ></Tile >
                })
                }
            </>
        )
    })
    //finds the board size
    //used for calculating inner board size
    const boardSize = (): number[] => {
        const size: number[] = [0, 0]
        size[0] = levelLayout[0].length
        size[1] = levelLayout.length
        return size
    }
    const boardSizeScale = 5
    //navigates back to the pervious page
    const navigateBack = () => {
        if (!location.state.isLevelMaker) {
            navigation('/Levels', {
                state: { area: location.state.area, areaIndex: location.state.areaIndex }
            })
        } else {
            navigation('/Areas')
        }
    }
    //resets to the originial board layout
    const reset = (layout: string) => {
        setLevelLayout(resetLayout(layout))
        shake()
    }
    //saves the board when in edit mode so it can be reset
    const setLevelSaveMaker = () => {
        var layoutStr = ''
        levelLayout.forEach((row) => {
            row.forEach((tile) => {
                layoutStr += tile
            })
            layoutStr += ','
        })
        layoutStr = layoutStr.substring(0, layoutStr.length - 1)
        const newLevel: Level = {
            number: level.number,
            layout: layoutStr,
            complete: level.complete,
            completedAnimationDone: level.completedAnimationDone,
            levelId: level.levelId
        }
        setLevel(newLevel)
    }

    //sets the layout to a blank layout
    const hardReset = () => {
        const levelLayoutCopy = [...levelLayout]
        levelLayoutCopy.forEach((row, index1) => {
            row.forEach((_, index2) => {
                levelLayoutCopy[index1][index2] = 0
            })
        })

        shake()
        setLevelLayout(levelLayoutCopy)

    }
    //copies level JSon
    const copy = () => {
        const json = JSON.stringify(level)
        navigator.clipboard.writeText(json);
        levelContext.newNotification("basic", "Copied To Clipboard")
    }
    const moveToNextLevel = () => {
        const area: Area = location.state.area
        setTimeout(() => {
            setLevelComplete(false)
        }, 300)

        if (level.number >= area.levels.length) {
            navigation('/Levels', { state: { area: area, areaIndex: location.state.areaIndex } })
        } else {
            navigation(`/Board?id=${level.number}`, { state: { level: area.levels[level.number], area: area, areaIndex: location.state.areaIndex, isLevelMaker: false } })
            setLevel(area.levels[level.number])
            reset(area.levels[level.number].layout)
        }
    }

    return (
        <>
            <div className='boardPageCont'>

                <div className='boardTitle' style={{ width: boardSize()[0] * 1.2 + 'em' }}>{level.levelId}</div>
                <InsetBox key={"insetBox"} height={boardSize()[1] * boardSizeScale + "em"} width={boardSize()[0] * boardSizeScale + "em"}>
                    <div key={"boardTilesCont"} className='boardTilesCont' style={{ gridTemplateColumns: columns(), gridTemplateRows: rows() }}>
                        {tiles}
                    </div>
                </InsetBox>
                <LevelMakerSection copy={copy} reset={hardReset} setLevel={setLevelSaveMaker} isMakerMode={location.state.isLevelMaker} editMode={editMode} setEditMode={setEditMode}></LevelMakerSection>
                <div className='boardPageActionBar'>
                    <Button size='4em' onClick={navigateBack}>
                        {BackArrow()}
                    </Button>
                    <div style={{ width: '3em' }}></div>
                    <Button size='4em' onClick={reset}>
                        {RestartArrowIcon()}
                    </Button>
                </div>
                <LevelComplete levelComplete={levelComplete} onClickMoveOn={() => { moveToNextLevel() }}></LevelComplete>
            </div >
        </>
    )
}

export default BoardPage