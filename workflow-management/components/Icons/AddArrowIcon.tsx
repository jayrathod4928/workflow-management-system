import React from 'react';

interface AddArrowIconProps {
    sx?: { mr: number }
}

export const AddArrowIcon = ({sx}: AddArrowIconProps) => (
    <svg width="28" height="77" viewBox="0 0 28 77" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.2929 76.7071C13.6834 77.0976 14.3166 77.0976 14.7071 76.7071L21.0711 70.3431C21.4616 69.9526 21.4616 69.3195 21.0711 68.9289C20.6805 68.5384 20.0474 68.5384 19.6569 68.9289L14 74.5858L8.34315 68.9289C7.95262 68.5384 7.31946 68.5384 6.92894 68.9289C6.53841 69.3195 6.53841 69.9526 6.92894 70.3431L13.2929 76.7071ZM13 4.37114e-08L13 76L15 76L15 -4.37114e-08L13 4.37114e-08Z" fill="#4F4F4F"/>
        <circle cx="14" cy="38.6328" r="13.4167" fill="white" stroke="#4F4F4F" stroke-width="1.16667"/>
        <path d="M9.33203 38.6328H18.6654" stroke="#4F4F4F" stroke-width="1.16667" stroke-linecap="round"/>
        <path d="M14 43.2969L14 33.9635" stroke="#4F4F4F" stroke-width="1.16667" stroke-linecap="round"/>
    </svg>

);
