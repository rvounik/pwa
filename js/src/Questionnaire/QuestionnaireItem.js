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

        return (
            <li className="questionnaire-items__item" id={ 'question'+questionId }>
                <Question question={ question } />
                <Answers type={ type }
                         answers={ answers }
                         handleClick={ handleClick } />
            </li>
        )
    }
}
