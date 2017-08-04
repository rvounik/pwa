import { h, Component } from 'preact';
import Question from './Question/Question';
import Answers from './Answers/Answers';
import ProgressBar from './ProgressBar/ProgressBar';

/** @jsx h */

export default class Questionnaire extends Component {
    constructor() {
        super();
        let someStateKey = '456';
        this.setState({ someStateKey });

        /* normally I would assume this to be defined at the 'inbox page' where the questionnaire was started from */
        this.state = {
            title: 'Topografie',
            currentQuestion: 1,
            questions: [
                {
                    title: 'Wat is de hoofdstad van Amsterdam?',
                    type: 1,
                    answers: [
                        {
                            answer: 'some answer',
                            value: 1
                        },
                        {
                            answer: 'some other answer',
                            value: 2
                        }
                    ]
                },
                {
                    title: 'Wat is de hoofdstad van Athene?',
                    type: 1,
                    answers: [
                        {
                            answer: 'some answer',
                            value: 1
                        },
                        {
                            answer: 'some other answer',
                            value: 2
                        }
                    ]
                }
            ]
        };
    }

    render() {
        let someVar = '123';
        let question = this.state.questions[this.state.currentQuestion - 1].title;
        let questionType = this.state.questions[this.state.currentQuestion - 1].type;
        let answers = this.state.questions[this.state.currentQuestion - 1].answers;
        let totalQuestions = this.state.questions.length;

        return (
            <section>
                <h1>{this.state.title}</h1>
                <Question question={ question } />
                <Answers type={ questionType } answers={ answers } />
                <ProgressBar currentQuestion={ this.state.currentQuestion } totalQuestions={ totalQuestions } />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <button onClick={ e => alert(someVar) }>Click Here</button>
            </section>
        )
    }
}
