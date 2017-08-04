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

        Object.keys(answers).forEach(function(key) {
            let answer = answers[key].answer;
            let value = answers[key].value;
            answerComponents.push(
                <Answer key={ key } answer={ answer } type={ type } value={ value } />
            );
        });

        return (
            <section className="answers">
                <ul>
                    { answerComponents }
                </ul>
            </section>
        )
    }
}
