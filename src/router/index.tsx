import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import loadable from '@loadable/component';

const TextAnalyzer = loadable(() => import('../views/TextAnalyzer'));
const WordsSearcher = loadable(() => import('../views/WordsSearcher'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <TextAnalyzer />,
    },
    {
        path: '/result',
        element: <WordsSearcher />,
    },
]);
