import { h, Component } from 'preact';
import Radio from './Type/Radio';
import Slider from './Type/Slider';

/** @jsx h */

export default class Answer extends Component {
    constructor() {
        super();
    }

    render() {
        let answer = this.props.answer;
        let value = this.props.value;
        let type = this.props.type;

        switch(type) {
            case 1: {return (<Radio answer={ answer } value={ value } />)}
            case 2: {return (<Slider answer={ answer } value={ value } />)}
            default: alert('invalid answertype specified');
        }
    }
}
