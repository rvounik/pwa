import { h, Component } from 'preact';
import Answer from './Answer/Answer';

/** @jsx h */

export default class Answers extends Component {
    constructor() {
        super();
    }

    render() {
        let { answers, type, handleClick, questionId } = this.props;

        let answerComponents = [];

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
                        questionId={ questionId }
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
