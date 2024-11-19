import { Color } from "../../../App";
import { selectedColor } from "../../../Components/HelperFuncs";

export const HomeIcon = (color?: Color) => {

    return (
        <svg fill={selectedColor(color).secondary} width="0.3em" height="0.3em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.554,8.168l-9-6A1,1,0,0,0,12,2h0a1,1,0,0,0-.554.168h0l-9,6a1,1,0,0,0-.278,1.387l0,0A1.05,1.05,0,0,0,3,10H4V21a1,1,0,0,0,1,1H19a.99.99,0,0,0,.389-.079,60.628,60.628,0,0,0,.318-.214A1,1,0,0,0,20,21V10h1a1,1,0,0,0,.555-1.832ZM10,20V13h4v7Zm6,0V12a1,1,0,0,0-1-1H9a1,1,0,0,0-1,1v8H6V8.2l6-4,6,4V20Z" /></svg>
    )
}