import { h, Component } from 'preact';

/** @jsx h */

export default class Radio extends Component {
    constructor() {
        super();
    }

    render() {
        let { answer, value, index, handleClick, questionId } = this.props;
        let labelId = questionId+'-'+value; // todo: this needs some.. sophistication

        return (
            <li tabIndex={ index } className="answers-list__item radio" onClick={() => handleClick(value)}>
                <input type="radio" name={ questionId } id={ labelId } value={ value } aria-checked="false" aria-required="true" autocomplete="off" />
                <label for={ labelId }>{ answer }</label>
            </li>
        )
    }
}
