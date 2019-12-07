import React from 'react';
import GitHugImg from '../img/GitHub_Logo.png';

export default () => {
    return (
        <header>
            <a 
            href="https://www.github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            >
                <img src={GitHugImg} alt="github-logo" height="40" />
            </a>
            <h1>Job Explorer</h1>
        </header>
    )
}