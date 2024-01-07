import leftFrom from '../assets/LeftForm.png';
import gaussSquare from '../assets/GaussSquare.png';
import rungeGausstext from '../assets/RungeGausstext.png';
import task from '../assets/task.png';

const GauseRungerText = () => {
    return (
        <>
            <h2>Численное интегрирование</h2>
            <img style={{
                marginLeft: "auto",
                marginRight: "auto"
            }} src={leftFrom} />
            <img style={{
                marginLeft: "auto",
                marginRight: "auto"
            }} src={rungeGausstext} />
            <img style={{
                marginLeft: "auto",
                marginRight: "auto"
            }} src={gaussSquare} />
            <img style={{
                marginLeft: "auto",
                marginRight: "auto",
                width:"55%"
            }} src={task}/>
        </>
    )
}
export default GauseRungerText;