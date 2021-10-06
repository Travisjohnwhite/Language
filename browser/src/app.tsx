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


/**
 * Returns an array of strings made op of splitting the given string
 * at spaces. 
 * 
 * @param s
 */
function toWords(s: string): string[] {
    s = s.replaceAll(/[\n\r.,":?\';]/g, ' ');
    let ss = s.split(' ');

    return ss.map(function(raw){
        return raw.toLowerCase();
    });
}

function toLines(l: string): string[] {
    l = l.replaceAll(/[\r.,":?\';]/g, ' ');
    let ll = l.split('\n');

    return ll.map(function(raw){
        return raw.toLowerCase();
    });
}

//console.log(toLines(t));


function getCount(ss: string[], s: string){
    let n = 0;
    for (let i=0; i<ss.length; i++){
        if (ss[i] === s) { n++ }
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
    const [lines, setLines] = useState<string[]|undefined>(undefined);
    const [searchStr, setSearchStr] = useState('');
    const [fetched, setFetched] = useState(false);
    const [searchStrMulti, setSearchStrMulti] = useState<string>('');
    const [line, setLine] = useState('');

    if (!fetched) {
        //const response = fetch('https://www.gutenberg.org/files/345/345-0.txt');
        const response = fetch('./dracula.txt');
        response.then(function(value) {
            value.text().then(t => {
                setWords(toWords(t));
                setLines(toLines(t));
            });
        });

        setFetched(true);
    }
    
    function onShowFreqClicked() {
        setCount(getCount(words!, searchStr));
    }
    function onTextChange(event: any){
        setSearchStr(event.target.value)
    }

    function onMultiTextChange(event: any){
            setSearchStrMulti(event.target.value)
    }


    function onShowClickedStack() {
        const words = toWords(searchStrMulti);

        let lines_ = lines!.slice();

        function r(word: string) {
            const filteredLines = [];
            for (let i=0; i<lines_.length; i++) {
                const line_ = lines_[i];
                if (line_.search(word) !== -1) {
                    filteredLines.push(line_);
                }
            }
            lines_ = filteredLines;
        }

        while (words.length > 0) {
            const word = words.pop()!;

            r(word);
        }

        console.log(lines_)
    }


    function onShowClickedRecursive() {
        const words = toWords(searchStrMulti);

        console.log(r(lines!.slice()))

        function r(lines: string[]): string[] {
            const word = words.pop()!;

            if (word === undefined) {
                return lines;
            }

            const filteredLines = [];
            for (let i=0; i<lines.length; i++) {
                const line_ = lines[i];
                if (line_.search(word) !== -1) {
                    filteredLines.push(line_);
                }
            }
            lines = filteredLines;

            return r(lines);
        }
    }


    return (
        <>
            <div>
                <h2>Word Frequency</h2>
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
            <div>
                <h2>Multiple Word Search</h2>
                 <p>
                    <span>
                        Enter Words:
                    </span>
                    <input 
                        value={searchStrMulti}
                        onChange={onMultiTextChange}
                    />
                </p>
                
                <p>
                    <button 
                        onClick={onShowClickedRecursive}
                        // onClick={onShowClickedStack}
                    >
                        Show Line
                    </button>
                </p>
                <p>
                    {line}
                </p>
            </div>
            
        </>
    );
}


ReactDOM.render(<App />, document.getElementById('app'));
