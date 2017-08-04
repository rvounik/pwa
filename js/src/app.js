import { h, render } from 'preact';
import Questionnaire from './Questionnaire/Questionnaire';

/** @jsx h */
/* note: the 'import h' and '@jsx h' stuff is needed to be able to render JSX. Also, ignore any PHPStorm syntax errors */

render(
    <Questionnaire />,
    document.querySelector('#app')
);

