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
            title: 'Topografie',
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
        }

    };

    componentDidMount() {
        // add event listener for window resize
        window.addEventListener('resize', fitQuestionToWindow);

        // add event listener for answering a question
        // let answers = document.querySelectorAll('.answers-list__item');
        //
        // Object.keys(answers).forEach(function(answer) {
        //     answers[answer].addEventListener('click', function(event) {
        //         event.preventDefault();
        //         console.log(this);
        //         //answerQuestion();
        //     });
        // });

        // resize once
        fitQuestionToWindow();
    }

    handleClick(answerId) {
        console.log('received click '+answerId);
        console.log(this.state);
        this.state.answers[this.state.currentQuestion] = answerId;
    }

    advanceToQuestion(question) {
        //console.log('user wants to advance to '+question);

        // check if current question was answered
        // if (this.state.answers[this.state.currentQuestion - 1]) {
        //     console.log('there seems to be an answer. advance okay.');
        // } else {
        //     alert('no answer given yet! (advance anyway to test the feature)');
        // }

        // animate to next question
        if(question < this.state.questions.length) {
            // let currentQuestionElement = document.querySelector('#question' + this.state.currentQuestion);
            // let nextQuestionElement = document.querySelector('#question' + question);

            let currentQuestionElement = $('#question' + this.state.currentQuestion);
            let nextQuestionElement = $('#question' + question);
            let leftOffsetByElement = 0 - (currentQuestionElement.parent().offset().left - currentQuestionElement.offset().left); // get the offset of the current question determined by the position of the content element
            let leftOffsetById      = 0 - (nextQuestionElement.parent().offset().left - nextQuestionElement.offset().left); // get the offset of the question determined by id
            if (leftOffsetByElement !== leftOffsetById) {
                // crap. do we need jquery for just this?
                $('#app').animate({
                    scrollLeft: 0 - (nextQuestionElement.parent().offset().left - nextQuestionElement.offset().left)
                }, 500);
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
                    handleClick={ this.handleClick }
                    questionId={ item.questionId }
            />;

            questionnaireItems.push(questionnaireItem);
        });

        return (
            <article className="questionnaire">
                <ul className="questionnaire__items">
                    { questionnaireItems }
                </ul>
                <nav onClick={ e => this.advanceToQuestion(this.state.currentQuestion+1) }>next</nav>
                <ProgressBar currentQuestion={ this.state.currentQuestion } totalQuestions={ totalQuestions } />
            </article>
        )
    }
}
