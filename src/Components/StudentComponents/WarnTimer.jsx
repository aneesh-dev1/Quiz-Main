import React from 'react'
import '../styles/timer.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const WarnTimer = () => {
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Too lale...</div>;
        }
      
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        );
      };
   return(<CountdownCircleTimer
    isPlaying
    duration={45}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[34, 23, 12, 0]}
    size={180}
  >
    {renderTime}
  </CountdownCircleTimer>)
}

export default WarnTimer