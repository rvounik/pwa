import { h, Component } from 'preact';
import $ from 'jquery';
import ProgressBar from './ProgressBar/ProgressBar';
import QuestionnaireItem from './QuestionnaireItem';
import { fitQuestionToWindow } from '../_helpers/FitQuestionToWindow'

/** @jsx h */

export default class Questionnaire extends Component {
    constructor() {
        super();

        // todo: pass this over from the inbox page instead, since that is the start page of the PWA
        this.state = {
            shouldUserGiveAnswer: true,
            currentQuestion: 1,
            questions: [
                {
                    questionId: '1',
                    question: 'Wat is de hoofdstad van Amsterdam?',
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
                    questionId: '2',
                    question: 'Wat is de hoofdstad van Athene?',
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
                    questionId: '3',
                    question: 'Wat is de hoofdstad van Paramaribo?',
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
            ],
            answers: [],
            eventlog: []
        };

        // bind local scope to giveAnswer function so state can be manipulated from child component
        this.giveAnswer = this.giveAnswer.bind(this);
    };

    componentDidMount() {
        // add event listener for window resize
        window.addEventListener('resize', fitQuestionToWindow);

        // resize once
        fitQuestionToWindow();
    }

    giveAnswer(answerId) {
        this.state.answers[this.state.currentQuestion] = answerId;
    }

    allowedToAdvance(requestedQuestion) {
        if(requestedQuestion > 0 && requestedQuestion < this.state.currentQuestion) {
            // always allow to go back
            return true;
        }
        if(requestedQuestion > 0 && requestedQuestion < (this.state.questions.length + 1)) {
            if (!this.state.shouldUserGiveAnswer) {
                // answer not compulsory
                return true;
            } else {
                if (this.state.answers[this.state.currentQuestion]) {
                    // answer given
                    let questionAlertId = '#question' + this.state.currentQuestion + '-alert';
                    document.querySelector(questionAlertId).classList.remove('active'); // if it was there
                    return true;
                } else {
                    // no answer given
                    let questionAlertId = '#question' + this.state.currentQuestion + '-alert';
                    document.querySelector(questionAlertId).classList.add('active');
                    return false;
                }
            }
        } else {
            // question out of scope
            return false;
        }
    }

    advanceToQuestion(requestedQuestion) {
        if(this.allowedToAdvance(requestedQuestion)){
            // animate to next question (based on randstad)
            if(requestedQuestion < (this.state.questions.length +1)) {
                let currentQuestionElement = $('#question' + this.state.currentQuestion);
                let nextQuestionElement = $('#question' + requestedQuestion);
                let leftOffsetByElement = 0 - (currentQuestionElement.parent().offset().left - currentQuestionElement.offset().left); // get the offset of the current question determined by the position of the content element
                let leftOffsetById      = 0 - (nextQuestionElement.parent().offset().left - nextQuestionElement.offset().left); // get the offset of the question determined by id

                if (leftOffsetByElement !== leftOffsetById) {
                    // todo: do we really need jquery for just this?!
                    $('#questionnaire-wrapper').animate({
                        scrollLeft: 0 - (nextQuestionElement.parent().offset().left - nextQuestionElement.offset().left)
                    }, 500);

                    this.state.currentQuestion = requestedQuestion;
                }
            }
        }
    }

    render() {
        let totalQuestions = this.state.questions.length;
        let questionnaireItems = [];

        this.state.questions.map((item) => {
            // todo: add spread operator
            let questionnaireItem = <QuestionnaireItem
                    question={ item.question }
                    answers={ item.answers }
                    type={ item.type }
                    handleClick={ this.giveAnswer }
                    questionId={ item.questionId }
            />;

            questionnaireItems.push(questionnaireItem);
        });

        return (
            <main>
                <header>
                    <ul className="nav-items">
                        <li className="nav-item nav-item__brand">
                            <a className="nav-item__link" href="/"></a>
                        </li>
                        <li className="nav-item nav-item__inbox active">
                            <a className="nav-item__link" href="inbox.html">
                                <span className="nav-item-link__text">Inbox</span>
                            </a>
                        </li>
                        <li className="nav-item nav-item__organisations ">
                            <a className="nav-item__link" href="#">
                                <span className="nav-item-link__text">Organisaties</span>
                            </a>
                        </li>
                        <li className="nav-item nav-item__tasks ">
                            <a className="nav-item__link" href="#">
                                <span className="nav-item-link__text">Taken</span>
                            </a>
                        </li>
                        <li className="nav-item nav-item__participants ">
                            <a className="nav-item__link" href="#">
                                <span className="nav-item-link__text">Gebruikers</span>
                            </a>
                        </li>
                    </ul>
                </header>

                <div id="questionnaire-wrapper">
                    <article className="questionnaire">
                        <ul className="questionnaire__items">
                            { questionnaireItems }
                        </ul>
                    </article>
                </div>

                <div className="alert alert-offline">
                    <p>
                        It seems you are currently not connected to a network. While this application has been configured to work offline, this is an experimental feature that you should use at your own risk. In any case it is recommended to leave this page open until your connection is restored.
                    </p>
                </div>
                <footer>
                    <nav>
                        <button onClick={ e => this.advanceToQuestion(this.state.currentQuestion - 1) } className="prev"></button>
                        <button onClick={ e => this.advanceToQuestion(this.state.currentQuestion + 1) } className="next"></button>
                    </nav>
                    <ProgressBar currentQuestion={ this.state.currentQuestion } totalQuestions={ totalQuestions } />
                </footer>
            </main>
        )
    }
}
