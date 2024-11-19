import Lottie from 'react-lottie'
import './Icons.css'
import { Color } from '../../../../App'
import ArrowAniData from '../ArrowAni.json'
import { flatten } from 'lottie-colorify'
import { hexToRGB, selectedColor } from '../../../../Components/HelperFuncs'




export const SquareIcon = (color?: Color) => {
    return (
        <div className='icon'>
            <svg fill={selectedColor(color).secondary} width="0.6em" height="0.6em" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M 13.7851 49.5742 L 42.2382 49.5742 C 47.1366 49.5742 49.5743 47.1367 49.5743 42.3086 L 49.5743 13.6914 C 49.5743 8.8633 47.1366 6.4258 42.2382 6.4258 L 13.7851 6.4258 C 8.9101 6.4258 6.4257 8.8398 6.4257 13.6914 L 6.4257 42.3086 C 6.4257 47.1602 8.9101 49.5742 13.7851 49.5742 Z" /></svg>
        </div>
    )
}

export const ViewFinderIcon = (color?: Color) => {
    return (
        <div className='icon'>
            <svg fill={selectedColor(color).secondary} width="0.6em" height="0.6em" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M 47.6171 21.4023 C 48.8591 21.4023 49.5157 20.7227 49.5157 19.4805 L 49.5157 13.7383 C 49.5157 8.9102 47.0780 6.4961 42.1562 6.4961 L 36.4374 6.4961 C 35.1952 6.4961 34.5155 7.1758 34.5155 8.3711 C 34.5155 9.5898 35.1952 10.2696 36.4374 10.2696 L 42.1093 10.2696 C 44.4062 10.2696 45.7421 11.5118 45.7421 13.9492 L 45.7421 19.4805 C 45.7421 20.7227 46.4218 21.4023 47.6171 21.4023 Z M 8.3827 21.4023 C 9.6015 21.4023 10.2577 20.7227 10.2577 19.4805 L 10.2577 13.9492 C 10.2577 11.5118 11.5702 10.2696 13.9140 10.2696 L 19.5858 10.2696 C 20.8046 10.2696 21.4843 9.5898 21.4843 8.3711 C 21.4843 7.1758 20.8046 6.4961 19.5858 6.4961 L 13.8436 6.4961 C 8.9687 6.4961 6.4843 8.9102 6.4843 13.7383 L 6.4843 19.4805 C 6.4843 20.7227 7.1640 21.4023 8.3827 21.4023 Z M 13.8436 49.5039 L 19.5858 49.5039 C 20.8046 49.5039 21.4843 48.8242 21.4843 47.6289 C 21.4843 46.4102 20.8046 45.7305 19.5858 45.7305 L 13.9140 45.7305 C 11.5702 45.7305 10.2577 44.4883 10.2577 42.0508 L 10.2577 36.5196 C 10.2577 35.2774 9.5780 34.5977 8.3827 34.5977 C 7.1405 34.5977 6.4843 35.2774 6.4843 36.5196 L 6.4843 42.2383 C 6.4843 47.0898 8.9687 49.5039 13.8436 49.5039 Z M 36.4374 49.5039 L 42.1562 49.5039 C 47.0780 49.5039 49.5157 47.0664 49.5157 42.2383 L 49.5157 36.5196 C 49.5157 35.2774 48.8360 34.5977 47.6171 34.5977 C 46.3984 34.5977 45.7421 35.2774 45.7421 36.5196 L 45.7421 42.0508 C 45.7421 44.4883 44.4062 45.7305 42.1093 45.7305 L 36.4374 45.7305 C 35.1952 45.7305 34.5155 46.4102 34.5155 47.6289 C 34.5155 48.8242 35.1952 49.5039 36.4374 49.5039 Z" /></svg>
        </div>
    )
}

export const TriangleIcon = (color?: Color) => {
    return (
        <div className='icon'>
            <svg width="0.6em" height="0.6em" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <title>triangle-filled</title>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="drop" fill={selectedColor(color).secondary} transform="translate(32.000000, 42.666667)">
                        <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape">

                        </path>
                    </g>
                </g>
            </svg>
        </div>
    )
}


export const TileIcon: React.JSX.Element[] = [
    <></>,
    SquareIcon(),
    TriangleIcon(),
    ViewFinderIcon()
]

export const ArrowAniIcon = (angle: number, color?: Color) => {

    const rgbColor = hexToRGB(window.getComputedStyle(document.documentElement).getPropertyValue(selectedColor(color).secondary.substring(4, selectedColor(color).secondary.length - 1)))

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: flatten(rgbColor, ArrowAniData),
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        },

    };
    return (
        <div className='icon'>
            <Lottie options={defaultOptions} style={{ zIndex: 100, transform: `rotate(${angle}deg)`, display: 'flex', alignItems: "center", justifyContent: "center" }} height={'180%'} width={"180%"}></Lottie>
        </div>
    )
}