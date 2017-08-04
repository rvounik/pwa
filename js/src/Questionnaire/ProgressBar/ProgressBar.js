import { h, Component } from 'preact';

/** @jsx h */

export default class ProgressBar extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        let currentQuestion = this.props.currentQuestion;
        let totalQuestions = this.props.totalQuestions;
        let progress = parseInt(currentQuestion)/parseInt(totalQuestions);
        document.querySelector('.progressbar__inner').style.width = 100 * progress + '%';

        if (progress === 1) {
            document.querySelector('.progressbar__inner').classList.add('full');
        }
    }

    render() {
        let currentQuestion = this.props.currentQuestion;
        let totalQuestions = this.props.totalQuestions;

        return (
            <section className="progressbar">
                <div className="progressbar__outer">
                    <div className="progressbar__inner"></div>
                </div>
                <div className="progressbar__number">
                    { currentQuestion } / { totalQuestions }
                </div>
            </section>
        )
    }
}
