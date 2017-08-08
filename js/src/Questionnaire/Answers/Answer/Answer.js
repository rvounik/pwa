import { h, Component } from 'preact';
import Radio from './Type/Radio';
import Slider from './Type/Slider';

/** @jsx h */

export default class Answer extends Component {
    constructor() {
        super();
    }

    render() {
        let { answer, value, type, index } = this.props;

        switch(type) {
            case 1: {return (<Radio answer={ answer } value={ value } index={ index } handleClick={ this.props.handleClick } />)}
            case 2: {return (<Slider answer={ answer } value={ value } handleClick={ this.props.handleClick }/>)}
            default: alert('invalid answertype specified');
        }
    }
}
