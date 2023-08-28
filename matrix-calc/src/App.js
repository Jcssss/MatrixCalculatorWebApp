
import React, { useState } from 'react';
import Matrix from './matrix-calc-code/matrix'
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
    const [values, setValues] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    const [height, setHeight] = useState(3);
    const [width, setWidth] = useState(3);

    const resizeMatrix = () => {
        var newArr = []
        for (var i = 0; i < height; i++) {
            newArr.push([]);
            for (var j = 0; j < width; j++) {
                if (i < values.length && j < values[0].length) {
                    newArr[i].push(values[i][j]);
                } else {
                    newArr[i].push(0);
                }
            }
        }
        setValues(newArr);
    }

    const changeEntry = (row, col, val) => {
        var newArr = values.map((arr, i) => (
            arr.map((item, j) => {
                if (i === row && j === col) {
                    return val;
                } else {
                    return item;
                }
            })
        ))
        setValues(newArr);
    }

    const calculate = () => {
        var matrix = new Matrix(width, height);

        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                matrix.setEntry(i, j, values[i][j]);
            }
        }

        matrix.findRowForm();
        matrix.reduceRowForm();
        setValues(matrix.matrix);
    }

    return (
        <div className="page">
            <div className="header flex-container"> 
                <FontAwesomeIcon className="icon" icon={faCalculator}/>
                <div>Matrix Calculator</div>
            </div>
            <div className="content-container">
                <div className="flex-container">
                    <label>Matrix Size: </label>
                    <input type="text" className="size-input" defaultValue={values.length} onChange={(changed) => setHeight(changed.target.value)}></input>
                    <input type="text" className="size-input" defaultValue={values[0].length} onChange={(changed) => setWidth(changed.target.value)}></input>
                </div>
                <div className="flex-container">
                    <button className="submit" onClick={()=> resizeMatrix()}>Change Size</button>
                </div>
                <div className="input-container">
                    { 
                        values.map((row, i) => (
                            <div key={i} className="matrix-row">
                                {
                                    row.map((item, j) => (
                                        <input 
                                            key={i.toString() + j.toString()} 
                                            className="value-input" 
                                            value={item} 
                                            onChange={(changed) => changeEntry(i, j, changed.target.value)}>
                                        </input>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="flex-container">
                    <div onClick={() => calculate()} className="calculate">
                        Reduce Matrix
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
