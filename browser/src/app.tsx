import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';


function App() {
    const [count,setCount] = useState<number|undefined>(undefined);

    
    function onShowFreqClicked() {
        setCount(9999);
    }

    return (
        <div>
            <p>
                <span>
                    Enter Word:
                </span>
                <input
                    type="text" 
                />
            </p>
            <p>
                <button 
                    onClick={onShowFreqClicked}
                >
                    Show Freq
                </button>
            </p>
            <p>
                {count}
            </p>
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('app'));
