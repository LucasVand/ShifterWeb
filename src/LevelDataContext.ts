import { createContext, useContext } from "react";
import levels from './jsons/Levels.json'
import { Color } from "./App";
export type LevelContext = {
    areas: Area[]
    setLevel: (newLevelObj: Level) => boolean
    color: Color
    newNotification: (notificationType: string, text: string) => boolean
}

export type Area = {
    name: string
    levels: Level[]
    locked: boolean
}

export type Level = {
    number: number
    layout: string
    complete: boolean
    completedAnimationDone: boolean
    levelId: string
}
export const LevelContext = createContext<LevelContext>({
    areas: levels,
    setLevel: () => { return false },
    color: {
        name: "",
        primary: "",
        secondary: "",
        topShadow: "",
        bottomShadow: "",
        id: 0
    },
    newNotification: () => { return false }
})

export const useLevelContext = (): LevelContext => { return useContext(LevelContext) }