export function fitQuestionToWindow() {
    /* some progressive enhancement to fill browser screen with the question container.
       because questions are not block level elements, they cannot fit with a 100%
       declaration. for these cases some javascript is needed. */

    let windowWidth = window.innerWidth + 'px';

    // content area. as wide as screen.
    document.querySelector('.questionnaire').style.maxWidth = windowWidth;

    // ul containing the li question containers. also as wide as screen
    document.querySelector('.questionnaire > ul').style.width = windowWidth;

    // each li question element
    let questionElementsList = document.querySelectorAll('.questionnaire-items__item');
    let questionElements = [...questionElementsList]; // convert nodeList to array
    questionElements.forEach(questionElement => {
        questionElement.style.width = windowWidth;
        questionElement.style.minWidth = windowWidth;
        questionElement.style.maxWidth = windowWidth;
    });
}
