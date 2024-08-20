// src/ScreenSizeFinder.jsx
import React, { useState, useEffect } from 'react';

const ScreenSizeFinder = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const updateScreenSize = () => {
        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', updateScreenSize);
        return () => {
            window.removeEventListener('resize', updateScreenSize);
        };
    }, []);

    const pxToEm = (px) => px / 16; // Assuming the root font-size is 16px
    const pxToRem = (px) => px / 16;
    const pxToVh = (px) => (px / window.innerHeight) * 100;
    const pxToVw = (px) => (px / window.innerWidth) * 100;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(`Copied: ${text}`);
    };

    return (
        <div className="container">
            <h1 className="header">Screen Size Finder</h1>
            <div className="grid">
                <div>
                    <h2 className="subHeader">Width:</h2>
                    <p>
                        Pixels: {screenSize.width}px
                        <button
                            onClick={() => copyToClipboard(`Pixels: ${screenSize.width}px`)}
                            className="copyButton"
                        >
                            Copy
                        </button>
                    </p>
                    <p>
                        EM: {pxToEm(screenSize.width).toFixed(2)}em
                        <button
                            onClick={() => copyToClipboard(`EM: ${pxToEm(screenSize.width).toFixed(2)}em`)}
                            className="copyButton"
                        >
                            Copy
                        </button>
                    </p>
                    <p>
                        REM: {pxToRem(screenSize.width).toFixed(2)}rem
                        <button
                            onClick={() => copyToClipboard(`REM: ${pxToRem(screenSize.width).toFixed(2)}rem`)}
                            className="copyButton"
                        >
                            Copy
                        </button>
                    </p>
                    <p>
                        VW: {pxToVw(screenSize.width).toFixed(2)}vw
                        <button
                            onClick={() => copyToClipboard(`VW: ${pxToVw(screenSize.width).toFixed(2)}vw`)}
                            className="copyButton"
                        >
                            Copy
                        </button>
                    </p>
                </div>
                <div>
                    <h2 className="subHeader">Height:</h2>
                    <p>
                        Pixels: {screenSize.height}px
                        <button
                            onClick={() => copyToClipboard(`Pixels: ${screenSize.height}px`)}
                            className="copyButton"
                        >
                            Copy
                        </button>
                    </p>
                    <p>
                        EM: {pxToEm(screenSize.height).toFixed(2)}em
                        <button
                            onClick={() => copyToClipboard(`EM: ${pxToEm(screenSize.height).toFixed(2)}em`)}
                            className="copyButton"
                        >
                            Copy
                        </button>
                    </p>
                    <p>
                        REM: {pxToRem(screenSize.height).toFixed(2)}rem
                        <button
                            onClick={() => copyToClipboard(`REM: ${pxToRem(screenSize.height).toFixed(2)}rem`)}
                            className="copyButton"
                        >
                            Copy
                        </button>
                    </p>
                    <p>
                        VH: {pxToVh(screenSize.height).toFixed(2)}vh
                        <button
                            onClick={() => copyToClipboard(`VH: ${pxToVh(screenSize.height).toFixed(2)}vh`)}
                            className="copyButton"
                        >
                            Copy
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ScreenSizeFinder;