import React from 'react'

export const suffulArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);
