import React from 'react';
import '@/styles/loader.css';

/**
 * Loader - A reusable spinner component to indicate loading state
 * 
 * @param {Object} props
 * @param {string} props.size - Size of the loader (small, medium, large)
 * @param {string} props.color - Color of the loader
 */
const Loader = ({
    size = 'medium',
    color = '#3498db'
}) => {
    const sizeClass = `loader-${size}`;

    return (
        <div className="loader-container">
            <div
                className={`loader ${sizeClass}`}
                style={{ borderTopColor: color }}
            ></div>
        </div>
    );
};

export default Loader;
