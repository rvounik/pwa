import { h, Component } from 'preact';

/** @jsx h */

export default class Radio extends Component {
    constructor() {
        super();
    }

    render() {
        let { answer, value, index, handleClick } = this.props;

        return (
            <li tabIndex={ index } className="answers-list__item radio" onClick={() => handleClick(value)}>
                <input type="radio" name="sex" id={ value } value={ value } aria-checked="false" aria-required="true" autocomplete="off" />
                <label for={ value }>{ answer }</label>
            </li>
        )
    }
}
