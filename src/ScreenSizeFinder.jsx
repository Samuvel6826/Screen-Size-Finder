import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const ScreenSizeFinder = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
    });
    const [orientation, setOrientation] = useState(window.screen.orientation.type);
    const [isAnimating, setIsAnimating] = useState(false);

    const updateScreenSize = () => {
        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio,
        });
        setOrientation(window.screen.orientation.type);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
    };

    useEffect(() => {
        window.addEventListener('resize', updateScreenSize);
        window.addEventListener('orientationchange', updateScreenSize);
        return () => {
            window.removeEventListener('resize', updateScreenSize);
            window.removeEventListener('orientationchange', updateScreenSize);
        };
    }, []);

    const pxToRem = (px) => px / 16;
    const pxToVh = (px) => (px / window.innerHeight) * 100;
    const pxToVw = (px) => (px / window.innerWidth) * 100;
    const pxToEm = (px) => px / 16;
    const pxToPercentageWidth = (px) => (px / window.innerWidth) * 100;
    const pxToPercentageHeight = (px) => (px / window.innerHeight) * 100;

    const showAlert = (message) => {
        toast(message);
    };

    const getAllInfo = () => {
        return `Screen Size Information:
Width: ${screenSize.width}px (${pxToRem(screenSize.width).toFixed(2)}rem, ${pxToVw(screenSize.width).toFixed(2)}vw, ${pxToPercentageWidth(screenSize.width).toFixed(2)}%)
Height: ${screenSize.height}px (${pxToRem(screenSize.height).toFixed(2)}rem, ${pxToVh(screenSize.height).toFixed(2)}vh, ${pxToPercentageHeight(screenSize.height).toFixed(2)}%)
Device Pixel Ratio: ${screenSize.devicePixelRatio}
Aspect Ratio: ${getAspectRatio()}
Device Category: ${getDeviceCategory()}
Orientation: ${orientation}
Color Depth: ${window.screen.colorDepth}-bit
Color Gamut: ${getColorGamut()}
Preferred Color Scheme: ${getPreferredColorScheme()}`;
    };

    const copyAllToClipboard = () => {
        const allInfo = getAllInfo();
        navigator.clipboard.writeText(allInfo);
        showAlert('All information copied to clipboard!');
    };

    const sendToWhatsApp = () => {
        const allInfo = getAllInfo();
        const encodedInfo = encodeURIComponent(allInfo);
        window.open(`https://wa.me/?text=${encodedInfo}`, '_blank');
    };

    const getAspectRatio = () => {
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(screenSize.width, screenSize.height);
        return `${screenSize.width / divisor}:${screenSize.height / divisor}`;
    };

    const getDeviceCategory = () => {
        if (screenSize.width <= 640) return 'Mobile';
        if (screenSize.width <= 1024) return 'Tablet';
        if (screenSize.width <= 1920) return 'Desktop';
        return 'Large Screen';
    };

    const getColorGamut = () => {
        if (window.matchMedia('(color-gamut: rec2020)').matches) return 'rec2020';
        if (window.matchMedia('(color-gamut: p3)').matches) return 'P3';
        if (window.matchMedia('(color-gamut: srgb)').matches) return 'sRGB';
        return 'Unknown';
    };

    const getPreferredColorScheme = () => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'Dark';
        if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'Light';
        return 'No preference';
    };

    const SizeInfo = ({ label, value, unit }) => (
        <div className={`size-info ${isAnimating ? 'animate' : ''}`}>
            <span className="label">{label}</span>
            <div className="value-container">
                <span className="value">{value}{unit}</span>
                <button onClick={() => navigator.clipboard.writeText(`${value}${unit}`)}>Copy</button>
            </div>
        </div>
    );

    return (
        <div className="screen-size-finder">
            <Toaster />
            <header>
                <h1>Screen Size Finder</h1>
                <p className="subtitle">Resize your browser to see real-time updates</p>
            </header>
            <main>
                <section className="size-grid">
                    <div className="size-column">
                        <h2>Width</h2>
                        <SizeInfo label="Pixels" value={screenSize.width} unit="px" />
                        <SizeInfo label="REM" value={pxToRem(screenSize.width).toFixed(2)} unit="rem" />
                        <SizeInfo label="VW" value={pxToVw(screenSize.width).toFixed(2)} unit="vw" />
                        <SizeInfo label="EM" value={pxToEm(screenSize.width).toFixed(2)} unit="em" />
                        <SizeInfo label="Percentage Width" value={pxToPercentageWidth(screenSize.width).toFixed(2)} unit="%" />
                    </div>
                    <div className="size-column">
                        <h2>Height</h2>
                        <SizeInfo label="Pixels" value={screenSize.height} unit="px" />
                        <SizeInfo label="REM" value={pxToRem(screenSize.height).toFixed(2)} unit="rem" />
                        <SizeInfo label="VH" value={pxToVh(screenSize.height).toFixed(2)} unit="vh" />
                        <SizeInfo label="EM" value={pxToEm(screenSize.height).toFixed(2)} unit="em" /> {/* Added EM */}
                        <SizeInfo label="Percentage Height" value={pxToPercentageHeight(screenSize.height).toFixed(2)} unit="%" />
                    </div>
                </section>
                <section className="additional-info">
                    <h2>Additional Information</h2>
                    <SizeInfo label="Device Pixel Ratio" value={screenSize.devicePixelRatio.toFixed(2)} unit="" />
                    <SizeInfo label="Aspect Ratio" value={getAspectRatio()} unit="" />
                    <SizeInfo label="Device Category" value={getDeviceCategory()} unit="" />
                    <SizeInfo label="Orientation" value={orientation} unit="" />
                    <SizeInfo label="Color Depth" value={window.screen.colorDepth} unit="-bit" />
                    <SizeInfo label="Color Gamut" value={getColorGamut()} unit="" />
                    <SizeInfo label="Preferred Color Scheme" value={getPreferredColorScheme()} unit="" />
                </section>
            </main>
            <footer>
                <div className="actions">
                    <button onClick={copyAllToClipboard} className="primary">Copy All</button>
                    <button onClick={sendToWhatsApp} className="secondary">Send to WhatsApp</button>
                </div>
            </footer>
        </div>
    );
};

export default ScreenSizeFinder;