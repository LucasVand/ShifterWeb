import { useEffect, useState } from 'react'
import colorsFile from './jsons/Colors.json'
import levelFile from './jsons/Levels.json'
import './App.css'
import MenuPage from './pages/MenuPage/MenuPage'
import { Route, Routes } from 'react-router'
import AreaPage from './pages/AreaPage/AreaPage'
import LevelPage from './pages/LevelPage/LevelPage'
import { Area, Level, LevelContext } from './LevelDataContext'
import BoardPage from './pages/BoardPage/BoardPage'
import Notification from './Components/Notification/Notification'


export interface Color {
  name: string
  primary: string
  secondary: string
  topShadow: string
  bottomShadow: string
  id: number
}

function App() {
  const [levels, setLevels] = useState<Area[]>(levelFile)
  const [shouldNotify, setShouldNotify] = useState(false)
  const [notificationText, setNofificationText] = useState('Welcome')
  const [color, _] = useState<Color[]>(colorsFile)
  const [selectedColorIndex, setSelectedColorIndex] = useState(2)
  const changeCSSVars = (index: number) => {
    const selectedColor = color[index]
    document.documentElement.style.setProperty('--primary', selectedColor.primary)
    document.documentElement.style.setProperty('--secondary', selectedColor.secondary)
    document.documentElement.style.setProperty('--bottomShadow', selectedColor.bottomShadow)
    document.documentElement.style.setProperty('--topShadow', selectedColor.topShadow)
  }

  useEffect(() => {
    changeCSSVars(selectedColorIndex)
  }, [])


  const setLevelData = (newLevelObj: Level): boolean => {
    const newLevelData: Area[] = [...levels]
    newLevelData.forEach((area: Area, index: number) => {
      var levelIndex = area.levels.findIndex((levelValue: Level) => levelValue.levelId == newLevelObj.levelId)
      if (levelIndex != -1) {
        newLevelData[index].levels[levelIndex] = newLevelObj
        setLevels(newLevelData)
        return true
      }
    })
    return false
  }

  const newNotification = (notificationType: string, text: string): boolean => {
    if (notificationType == 'basic') {
      setShouldNotify(true)
      setNofificationText(text)
      return true
    }
    return false
  }
  return (
    <>
      <LevelContext.Provider value={{ areas: levels, setLevel: setLevelData, color: color[selectedColorIndex], newNotification: newNotification }}>
        <Notification shouldNotify={shouldNotify} setShouldNotify={setShouldNotify} text={notificationText}></Notification>
        <Routes>
          <Route path='/' element={<MenuPage></MenuPage>}></Route>
          <Route path='/Areas' element={<AreaPage></AreaPage>}></Route>
          <Route path='/Levels' element={<LevelPage></LevelPage>}></Route>
          <Route path='/Board' element={<BoardPage></BoardPage>}></Route>
        </Routes >
      </LevelContext.Provider>
    </>
  )
}

export default App
