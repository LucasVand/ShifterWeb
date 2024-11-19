import { useEffect } from 'react'
import './LevelButton.css'
import Lottie from 'react-lottie'
import checkMarkAniData from '../Icons/Radio button/radioButton.json'

import { Area, Level, useLevelContext } from '../../../LevelDataContext'
import Button from '../../../Components/Button/Button'
import { useNavigate } from 'react-router'
import { flatten } from 'lottie-colorify'
import { hexToRGB } from '../../../Components/HelperFuncs'
interface LevelButtonProps {
    level: Level
    area: Area
    areaIndex: number
    appearDelay: number
}
function LevelButton(props: LevelButtonProps) {
    const navigator = useNavigate()
    const levelContext = useLevelContext()
    const navigateToLevel = () => {
        navigator('/Board', { state: { level: props.level, area: props.area, areaIndex: props.areaIndex, isLevelMaker: false } })
    }
    const setlevelAnimationStatus = () => {
        const levelCopy = { ...props.level }

        if (levelCopy.complete && !levelCopy.completedAnimationDone) {
            levelCopy.completedAnimationDone = true
            levelContext.setLevel(levelCopy)
        }
    }

    const defaultOptions = {
        loop: false,
        autoplay: props.level.complete,
        animationData: flatten(hexToRGB(levelContext.color.secondary), checkMarkAniData),
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        },

    };

    useEffect(() => {
        setTimeout(() => {
            setlevelAnimationStatus()
        }, 1000);
    }, [])

    return (
        <>
            <Button appearDelay={props.appearDelay + 0.001} size='4em' key={props.level.levelId + "LevelBox"} onClick={() => { navigateToLevel() }}>
                <Lottie speed={props.level.complete && !props.level.completedAnimationDone ? 1 : 1000} isStopped={!props.level.complete} isClickToPauseDisabled={true} options={defaultOptions} height={'60%'} width={"60%"} style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}></Lottie>
            </Button>
        </>
    )
}

export default LevelButton