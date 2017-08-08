export function fitQuestionToWindow() {
    // some progressive enhancement to fill browser screen with the question container. because questions are not block level elements, they cannot fit with a 100% declaration. javascript is needed.
    let ww = window.innerWidth; // this seems to be the only way to get correct width on mobile devices, too. do not use document.width().

    ww = ww+'px';
    document.querySelector('.questionnaire').style.maxWidth = ww; // content area. as wide as screen.

    document.querySelector('.questionnaire > ul').style.width = ww; // ul containing the li question containers. also as wide as screen
    document.querySelector('.questionnaire-items__item').style.minWidth = ww; // each li question container, also as wide as screen (EACH!)
    //      var currentItem = $('#q'+parseInt($('#currentq').val()));
    //        document.querySelector('.content').animate({
    //            scrollLeft: 0 - (currentItem.parent().offset().left - currentItem.offset().left)
    //        }, 0);
}
