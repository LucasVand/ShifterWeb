import { useLocation, useNavigate } from 'react-router'
import './LevelPage.css'
import Button from '../../Components/Button/Button'
import { Level, useLevelContext } from '../../LevelDataContext'
import { BackArrow } from '../AreaPage/Icons'
import LevelButton from './LevelButton/LevelButton'
import { HomeIcon } from './Icons/Icons'



function LevelPage() {
    const location = useLocation()
    const amountOfColumns = 4
    const navigator = useNavigate()
    const levelContext = useLevelContext()
    const levels = levelContext.areas[location.state.areaIndex].levels.map((level: Level, index: number) => {
        return <LevelButton appearDelay={index * 0.08} area={location.state.area} areaIndex={location.state.areaIndex} level={level} key={level.levelId + "LevelSelector"}></LevelButton>
    })
    const rows = () => {
        var returnStr = ''
        const levels: Level[] = location.state.area.levels
        var count = 0
        while (count < levels.length) {
            returnStr += '1fr '
            count += amountOfColumns
        }
        return returnStr
    }
    const columns = () => {
        const percent = 100 / amountOfColumns
        var returnStr = ''
        for (let i = 0; i < 4; i++) {
            returnStr += percent + "% "
        }
        return returnStr
    }
    return (
        <>
            <div className='levelPageCont'>
                <div className='levelAreaTitle' style={{ width: `${location.state.area.levels.length * 0.39}em` }}>{location.state.area.name}</div>
                <div className='levelsCont' style={{ gridTemplateRows: `${rows()}`, gridTemplateColumns: `${columns()}` }}>
                    {levels}
                </div>
                <div className='navigationCont'>
                    <Button size='5em' onClick={() => { navigator('/Areas') }}>{BackArrow()}</Button>
                    <Button size='5em' onClick={() => { navigator('/') }}>{HomeIcon()}</Button>
                </div>

            </div>
        </>
    )
}

export default LevelPage