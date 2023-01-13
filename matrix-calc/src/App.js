import './App.css';
import React, { useState } from 'react';

function App() {
    const [values, setValues] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    const [height, setHeight] = useState(3);
    const [width, setWidth] = useState(3);

    const resizeMatrix = () => {
        var newArr = []
        for (var i = 0; i < height; i++) {
            newArr.push([]);
            for (var j = 0; j < width; j++) {
                newArr[i].push(0);
            }
        }
        setValues(newArr);
    }

    return (
        <div>
            <div className="Header"> Matrix Calculator </div>
            <div className="ContentContainer">
                <div className="FlexContainer">
                    <label>Change Size: </label>
                    <input type="text" className="SizeInput" defaultValue={values.length} onChange={(changed) => setHeight(changed.target.value)}></input>
                    <input type="text" className="SizeInput" defaultValue={values[0].length} onChange={(changed) => setWidth(changed.target.value)}></input>
                </div>
                <div className="FlexContainer">
                    <button className="Submit" onClick={()=> resizeMatrix()}>Submit Change</button>
                </div>
                <div className="InputContainer">
                    { 
                        values.map((row, i) => (
                            <div key={i} className="MatrixRow">
                                {
                                    row.map((item, j) => (
                                        <input key={i.toString() + j.toString()} className="SizeInput" defaultValue={item}></input>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
