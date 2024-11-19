import './LevelComplete.css'

interface LevelCompleteProps {
    levelComplete: boolean
    onClickMoveOn: Function
}
function LevelComplete(props: LevelCompleteProps) {

    return (
        <>
            <div className={`levelCompleteCont ${props.levelComplete ? 'show' : ''}`}>
                <div className='levelComplete' style={{ bottom: `${props.levelComplete ? 0 : -100}%` }}>
                    <div className='levelCompleteTitle'>Level Completed</div>
                    <div className='levelCompleteStar'>★</div>
                    <button className='levelCompleteButton' onClick={() => { props.onClickMoveOn() }} >To Next Level</button>
                </div>
            </div >
        </>
    )
}
export default LevelComplete