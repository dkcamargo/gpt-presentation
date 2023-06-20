import React, { useState } from 'react';
import './promptForm.css'; // Import the CSS file for styling
import copy from '../../assets/copy.svg';
import send from '../../assets/send.svg';

function PromptForm({ type }) {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('>');
    const [expanded, setExpanded] = useState(false);
    const API_URL =  {
        unitTestCases: 'http://localhost:5000/code/unit_test_cases',
        codeCommit: 'http://localhost:5000/code/comment',
        codeComment: 'http://localhost:5000/code/commit',
        chatBot: 'http://localhost:5000/chatbot/faq',
    }[type];

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setInput2('>');
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({ code: input1 }),
                headers: {
                'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }
            const data = await response.text();

            setInput2('> ' + data);
            setExpanded(true);
        } catch (error) {
            console.error(error);
            setInput2('!> Error occurred');
            setExpanded(true);
        }
    };



    const handleCopy = () => {
        navigator.clipboard.writeText(input2);
        alert('Text copied to clipboard!');
    };

    return (
        <div className="prompt-wrap">
            <form onSubmit={handleFormSubmit}>
                <textarea
                    className={expanded?'prompt-text prompt-input prompt-input-collapsed':'prompt-text prompt-input'}
                    value={input1}
                    placeholder="Ask your question..."
                    onChange={(e) => { setExpanded(false); setInput1(e.target.value);}}
                    rows={10} // Set the number of rows to 10
                />
                <br/><br/>
                <button 
                    type="submit"
                    className={expanded?'svg-button submit-button svg-button-disabled':'svg-button submit-button'}
                >
                    <img src={send} />
                </button>
            </form>
            <textarea
                className={expanded?'prompt-text prompt-output prompt-output-expanded':'prompt-text prompt-output'}
                type="text"
                value={input2}
                placeholder=">"
                readOnly
                rows={10} // Set the number of rows to 10
                onClick={() => { 
                    if(input2 !== '>') { setExpanded(!expanded); }
                }}
            />
            <button 
                className={expanded?'svg-button copy-button':'svg-button copy-button svg-button-disabled'}
                onClick={handleCopy}
            >
                <img src={copy} />
            </button>
        </div>
    );
}

export default PromptForm;
