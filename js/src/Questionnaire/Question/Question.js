import { h, Component } from 'preact';

/** @jsx h */

export default class Question extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <section className="question">
                <h3 className="question__title">{ this.props.question }</h3>
            </section>
        )
    }
}
