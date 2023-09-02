import React, { useState } from 'react'
import Sound from 'react-sound';
import playSvg from '../img/svg/play.svg'
import pauseSvg from '../img/svg/pause.svg'
import SunSvg from '../img/svg/sun.svg'
import RainSvg from '../img/svg/rain.svg'
import BeachMp3 from '../sound/beach.mp3'
import RainMp3 from '../sound/rain.mp3'
const Main = () => {

    // sun or rain mode
    const [isSun, setIsSun] = useState(true)
    const SunOrRain = () => {
        setIsSun(!isSun)
    }

    const [timerInterval, setTimerInterval] = useState()

    //minutes
    const [timerMinutes, setTimerMinutes] = useState(0);
    // seconds
    const [timerSeconds, setTimerSeconds] = useState(0);

    // button start/pause
    const [isStarting, setIsStarting] = useState(false)
    // no value
    const [noValue, setNoValue] = useState()

    // console.log(isStarting)
    const resetTimer = () => {
        setIsStarting(false);
        setTimerMinutes(0);
        setTimerSeconds(0);
        clearInterval(timerInterval);
    };




    const counter = () => {

        if (isStarting === false) {
            if (timerMinutes > 0 || timerSeconds > 0) {
                let startDate = new Date();
                let endDate = new Date(startDate.getTime() + timerMinutes * 60 * 1000 + timerSeconds * 1000);
                setIsStarting(!isStarting);

                const intervalTick = () => {

                    //date

                    let currentDate = new Date()
                    let differenceDate = endDate - currentDate;

                    let countdownMinutes = Math.floor((differenceDate % (1000 * 60 * 60)) / (1000 * 60));
                    let countdownSeconds = Math.floor((differenceDate % (1000 * 60)) / 1000);

                    setTimerMinutes(countdownMinutes)
                    setTimerSeconds(countdownSeconds)


                    if (countdownMinutes === 0 && countdownSeconds === 0) {
                        setIsStarting(false)
                        clearInterval(localTimerInterval);
                    }


                }

                setTimeout(() => {
                    intervalTick();
                }, 100);

                let localTimerInterval = setInterval(intervalTick, 1000);

                setTimerInterval(localTimerInterval)

            } else {
                setNoValue('Inserisci un valore')
            }
        } else {
            setIsStarting(false);
            clearInterval(timerInterval);
        }

    }

    const initializeTimer = (value) => {
        if (isStarting) {
            clearInterval(timerInterval)
            setIsStarting(false)
        }

        setTimerMinutes(value);
        setTimerSeconds(0)
        setNoValue()//remove insert value
    }


    return (

        <main>
            <div className='sunOrRainBox'>
                <button className='buttonSun'
                    onClick={SunOrRain}>
                    {isSun ? <img className='sunOrRainSvg' src={SunSvg} />
                        : <img className='sunOrRainSvg' src={RainSvg} />}
                </button>
            </div>
            <h2 className={isSun ? 'textSun' : 'textRain'}
            >Inizia a meditare, scegli il lasso di tempo che preferesci.</h2>
            <div className="topBox">
                {/*Time Button*/}
                <button className={isSun ? 'btn timeButtonSun' : 'btn timeButtonRain'} onClick={() => initializeTimer(10)}>10</button>
                <button className={isSun ? 'btn timeButtonSun' : 'btn timeButtonRain'} onClick={() => initializeTimer(15)}>15</button>
                <button className={isSun ? 'btn timeButtonSun' : 'btn timeButtonRain'} onClick={() => initializeTimer(30)}>30</button>
            </div>

            <div className="centralBox">
                {/*Timer*/}
                <div className={isSun ? 'timerBoxSun' : 'timerBoxRain'}>
                    <h2 className='timer'>{String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}</h2>
                </div>
            </div>

            <div className="noValueBox">
                <h4 className="noValueText">{noValue}</h4>
            </div>

            <div className="bottomBox">
                <button className={isSun ? 'btn startButtonSun' : 'btn startButtonRain'} onClick={counter}> {isStarting ? <img src={pauseSvg} className='pauseSvg' /> : <img className='playSvg' src={playSvg} />}</button>
                <button className="btn resetButton" onClick={resetTimer}>Reset</button>
            </div>
            <Sound
                url={BeachMp3}
                playStatus={isSun && isStarting ? Sound.status.PLAYING : Sound.status.STOPPED}
                onFinishedPlaying={() => isStarting(false)}
            />
            <Sound
                url={RainMp3}
                playStatus={!isSun && isStarting ? Sound.status.PLAYING : Sound.status.STOPPED}
                onFinishedPlaying={() => isStarting(false)}
            />
        </main>
    )
}

export default Main
