import { h, Component } from 'preact';
import Question from './Question/Question';
import Answers from './Answers/Answers';

/** @jsx h */

export default class QuestionnaireItem extends Component {
    constructor() {
        super();
    }

    render() {
        let { question, type, answers, handleClick, questionId } = this.props;
        let questionAlertId = 'question' + questionId + '-alert'; // todo: needs some.. sophistication

        return (
            <li className="questionnaire-items__item" id={ 'question'+questionId }>
                <Question question={ question } />
                <span role="alert" className="alert alert-error floating" id={ questionAlertId }>Er is geen (geldig) antwoord gegeven.</span>
                <Answers type={ type }
                         answers={ answers }
                         handleClick={ handleClick }
                         questionId={ questionId }
                />
            </li>
        )
    }
}
