import './AreaPage.css'

import Button from '../../Components/Button/Button'
import { BackArrow, LockIcon } from './Icons'
import { useNavigate } from 'react-router'
import { Area, Level, useLevelContext } from '../../LevelDataContext'

function AreaPage() {
    const navigator = useNavigate()
    const LevelContext = useLevelContext()
    const areaIcons = (area: Area) => {
        if (!area.locked) {
            return <div className='areasName'>{area.name}</div>
        } else {
            return LockIcon()
        }
    }
    const setLocationToArea = (area: Area, areaIndex: number) => {
        navigator('/Levels', { state: { area: area, areaIndex: areaIndex } })
    }

    const areas = LevelContext.areas.map((area: Area, index: number) => {

        return (
            <Button size={'7em'} onClick={() => { setLocationToArea(area, index) }} appearDelay={index * 0.10 + 0.001} key={area.name + "Area"}>
                {areaIcons(area)}
            </Button>
        )
    })

    return (
        <>
            <div className='areaPageCont'>
                <div className='areaStars'>100</div>
                <div className='areaTitle'>Regular</div>

                <div className='areasCont'>
                    {areas}
                </div>
                <Button size='6em' onClick={() => {
                    const defaultLevel: Level = {
                        number: 0,
                        layout: '0000,0000,0000,0000',
                        complete: false,
                        completedAnimationDone: false,
                        levelId: 'M1'
                    }
                    navigator('/Board', { state: { level: defaultLevel, area: undefined, areaIndex: undefined, isLevelMaker: true } })
                }}><span style={{ fontSize: '0.2em' }}>Level Maker</span></Button>
                <Button size='5em' onClick={() => { navigator('/') }} appearDelay={0.7}>{BackArrow()}</Button>
            </div>
        </>
    )
}

export default AreaPage