import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';


const t = `
This eBook is for the use of anyone anywhere in the United States and
most other parts of the world at no cost and with almost no restrictions
whatsoever. You may copy it, give it away or re-use it under the terms
of the Project Gutenberg License included with this eBook or online at
www.gutenberg.org. If you are not located in the United States, you
will have to check the laws of the country where you are located before
using this eBook.
`;


function toWords(s: string): string[] {
    s = s.replaceAll(/[\n\r.,":?\';]/g, ' ');
    let ss = s.split(' ');

    return ss.map(function(raw){
        return raw.toLowerCase();
    });
}

//console.log(toWords(t))

function getCount(ss: string[], s: string){
    let n = 0;
    for (let i=0; i<ss.length; i++){
        if (ss[i] === s) { n++ }
        if (ss[i].match('acula')) {
            console.log(ss[i])
        }
    }

    return n;
}


function log(a: any) { 
    console.log(a);
    return a;
}


function App() {
    const [count,setCount] = useState<number|undefined>(undefined);
    const [words, setWords] = useState<string[]|undefined>(undefined);
    const [searchStr, setSearchStr] = useState("");
    const [fetched, setFetched] = useState(false);

    if (!fetched) {
        //const response = fetch('https://www.gutenberg.org/files/345/345-0.txt');
        const response = fetch('./dracula.txt');
        response.then(function(value) {
            value.text().then(t => {
                setWords(log(toWords(t)));
            });
        });

        setFetched(true);
        console.log('once')
    }
    
    function onShowFreqClicked() {
        setCount(getCount(words!, searchStr));
    }
    function onTextChange(event: any){
        setSearchStr(event.target.value)
    }

    return (
        <div>
            <p>
                <span>
                    Enter Word:
                </span>
                <input 
                    value={searchStr}
                    type="text" 
                    onChange={onTextChange}
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
