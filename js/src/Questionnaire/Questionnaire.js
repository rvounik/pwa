import { h, Component } from 'preact';

/** @jsx h */

export default class Questionnaire extends Component {
    constructor() {
        super();
        let someStateKey = '456';
        this.setState({ someStateKey });

        /* normally I would assume this to be defined at the 'inbox page' where the questionnaire was started from */
        this.state.questionnaire = {
            title: 'some questionnaire title',
            description: 'a description',
            questions: [
                {
                    'question title': 1,
                    type: 1,
                    answers: {
                        'some answer': 1,
                        'another answer': 2
                    }
                },
                {
                    'another question title': 2,
                    type: 1,
                    answers: {
                        'some other answer': 1,
                        'another other answer': 2,
                        'also a third answer here': 3
                    }
                }
            ]
        };
    }

    render() {
        let someVar = '123';

        return (
            <section>
                <h1>{this.state.questionnaire.title}</h1>
                <span><p>{this.state.questionnaire.description}</p></span>
                <button onClick={ e => alert(someVar) }>Click Here</button>
            </section>
        )
    }
}
