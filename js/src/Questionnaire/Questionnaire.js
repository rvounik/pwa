import { h, Component } from 'preact';

/** @jsx h */

class Questionnaire extends Component {
    render() {
        return (
            <div id="foo">
                <span>This is Preact speaking</span>
                <button onClick={ e => alert("working fine") }>Click Here</button>
            </div>
        )
    }
}

export default Questionnaire;
