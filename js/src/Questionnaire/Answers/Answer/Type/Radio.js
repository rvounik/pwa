import { h, Component } from 'preact';

/** @jsx h */

export default class Radio extends Component {
    constructor() {
        super();
    }

    render() {
        let answer = this.props.answer;
        let value = this.props.value;

        return (
            <li><input type="radio" value={ value }></input>{ answer }</li>
        )
    }
}
