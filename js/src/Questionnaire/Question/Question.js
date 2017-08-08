import { h, Component } from 'preact';

/** @jsx h */

export default class Question extends Component {
    constructor() {
        super();
    }

    render() {
        let question = this.props.question;

        return (
            <section className="question">
                <h2 aria-disabled="false" tabIndex="0" aria-label={ question } class="question__title">
                    { question }
                </h2>
            </section>
        )
    }
}
