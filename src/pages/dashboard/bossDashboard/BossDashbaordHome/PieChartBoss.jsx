/* eslint-disable react/prop-types */
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const PieChartBoss = ({value}) => {
    const percentage = value;
      
      
    return (
        <div className='w-[50%] md:w-[70%] mx-auto my-5'>
            
<CircularProgressbar
  value={percentage}
  text={`${percentage}%`}
  strokeWidth={6}
  styles={buildStyles({
    rotation: 0.25,
    strokeLinecap: 'round',
    textSize: '16px',
    pathTransitionDuration: 0.5,
    // Colors
    pathColor: `#5AB2FF ${percentage / 100})`,
    textColor: '#ccc',
    trailColor: '#d6d6d6',
    backgroundColor: '#5AB2FF',
  })}
/>
        </div>
    )
}

export default PieChartBoss;