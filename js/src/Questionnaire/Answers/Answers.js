import { h, Component } from 'preact';
import Answer from './Answer/Answer';

/** @jsx h */

export default class Answers extends Component {
    constructor() {
        super();
    }

    render() {
        let answers = this.props.answers;
        let type = this.props.type;
        let answerComponents = [];
        let handleClick = this.props.handleClick;

        Object.keys(answers).forEach(function(key) {
            let answer = answers[key].answer;
            let value = answers[key].value;
            answerComponents.push(
                <Answer key={ key }
                        answer={ answer }
                        type={ type }
                        value={ value }
                        index={ key }
                        handleClick={ handleClick }
                />
            );
        });

        return (
            <section className="answers">
                <ul className="answers__list" aria-disabled="false">
                    { answerComponents }
                </ul>
            </section>
        )
    }
}
