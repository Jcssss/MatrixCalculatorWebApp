const CalculateButton = ({onClick}) => {
    return (
        <div onClick={() => onClick()}>
            Perform Calculation
        </div>
    );
}

export default CalculateButton;