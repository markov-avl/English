import React, {useEffect, useState} from 'react';
import './App.css';


enum Text {
    FIRST = 1,
    SECOND = 2,
    THIRD = 3,
    FOURTH = 4,
    FIFTH = 5,
}

function App() {
    const [textNumber, setTextNumber] = useState(Text.FIRST)
    const [text, setText] = useState('')
    const [translation, setTranslation] = useState('')

    useEffect(() => {
        fetch(`/${textNumber}.txt`)
            .then(r => r.text())
            .then(setText)
        fetch(`/${textNumber}.translation.txt`)
            .then(r => r.text())
            .then(setTranslation)
    }, [textNumber])

    const regex = /[^\\.!?\n]+[\\.!?\n]+/g

    const translatedSentences: string[] = translation.match(regex)
        ?.map(s => s.trim()) || []
    const sentences = text.match(regex)
        ?.map((s, i) => {
            const sentence = s.trim()
            const spaceLeft = s.replace(s.trimStart(), '')
            const spaceRight = s.replace(s.trimEnd(), '')

            let elements = [
                <span className="tooltip">{sentence}
                    <span className="tooltiptext tooltip-top">{translatedSentences[i]}</span>
                </span>
            ]

            const spaceLeftElement = spaceLeft.includes('\n')
                ? <>{spaceLeft.match(/\n/g)?.map(_ => <br/>)}</>
                : <span>{spaceLeft}</span>
            const spaceRightElement = spaceRight.includes('\n')
                ? <>{spaceRight.match(/\n/g)?.map(_ => <br/>)}</>
                : <span>{spaceRight}</span>

            if (spaceLeft) {
                elements = [spaceLeftElement, ...elements]
            }
            if (spaceRight) {
                elements = [...elements, spaceRightElement]
            }

            return elements
        })
        ?.flatMap(a => a) || []

    const symbolsNumber = text.match(/[a-zA-Z]/g)?.length || 0

    return (
        <div className="App">
            <div className={'text-switcher'}>
                <input type={'radio'} onClick={() => setTextNumber(Text.FIRST)} checked={textNumber === Text.FIRST}/>
                <label>1st text</label>
                <input type={'radio'} onClick={() => setTextNumber(Text.SECOND)} checked={textNumber === Text.SECOND}/>
                <label>2nd text</label>
                <input type={'radio'} onClick={() => setTextNumber(Text.THIRD)} checked={textNumber === Text.THIRD}/>
                <label>3rd text</label>
                <input type={'radio'} onClick={() => setTextNumber(Text.FOURTH)} checked={textNumber === Text.FOURTH}/>
                <label>4th text</label>
                <input type={'radio'} onClick={() => setTextNumber(Text.FIFTH)} checked={textNumber === Text.FIFTH}/>
                <label>5th text</label>
            </div>
            <div className={'stats'}>Character number (only a-zA-Z): {symbolsNumber}</div>
            <div>
                {sentences}
            </div>
        </div>
    );
}

export default App;
