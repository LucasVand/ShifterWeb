import Button from '../../Components/Button/Button'
import './MenuPage.css'
import { PlayIcon, SettingsIcon, ColorsIcon } from './Icons.tsx'
import { useNavigate } from 'react-router'
function MenuPage() {
    const navigation = useNavigate()
    return (
        <>
            <div className='menuCont'>
                <div className='menuTitle'>Shifter</div>
                <Button size='9em' appearDelay={0.0} onClick={() => { navigation('/Areas') }}>
                    {PlayIcon()}
                </Button>
                <Button size='9em' appearDelay={0.15}>
                    {ColorsIcon()}
                </Button>
                <Button size='9em' appearDelay={0.3}>
                    {SettingsIcon()}
                </Button>

            </div>
        </>
    )
}

export default MenuPage