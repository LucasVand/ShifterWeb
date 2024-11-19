
import Button from '../../../Components/Button/Button'
import Toggle from '../../../Components/Toggle/Toggle'
import './LevelMakerSection.css'
interface LevelMakerSectionProps {
    isMakerMode: boolean
    editMode: boolean
    setEditMode: Function
    setLevel: Function
    reset: Function
    copy: Function
}
function LevelMakerSection(props: LevelMakerSectionProps) {
    return (
        <>
            <div className={`${props.isMakerMode ? "levelMakerCont" : 'none'}`}>
                <Toggle onClick={() => { props.setEditMode(!props.editMode) }} toggled={props.editMode}></Toggle>
                <Button size='5em' onClick={() => { props.reset() }}><span style={{ fontSize: '0.2em' }}>Reset</span></Button>
                <Button size='5em' onClick={() => { props.setLevel() }}><span style={{ fontSize: '0.2em' }}>Save</span></Button>
                <Button size='5em' onClick={() => { props.copy() }}><span style={{ fontSize: '0.2em' }}>Copy</span></Button>
            </div>
        </>
    )
}


export default LevelMakerSection