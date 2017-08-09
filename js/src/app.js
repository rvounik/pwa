import { h, render } from 'preact';
import Questionnaire from './Questionnaire/Questionnaire';

/** @jsx h */
/* note: the 'import h' and '@jsx h' stuff is needed to be able to render JSX. Also, ignore any PHPStorm syntax errors */


// note: while preact is capable of replacing a DOM node, in this case this is not very useful
render(
    <Questionnaire />,
    document.querySelector('body'),
    document.querySelector('body').firstChild
);

