function Menu(container) {
    var elements = container.getElementsByClassName('menu-element');    

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.dataset.index = i;
        element.addEventListener('click', function() {
            var index = parseInt(this.dataset.index);
            if (index === 1) { // left
                rotateElementsRight(elements);
            } else if (index === 3) { // right
                rotateElementsLeft(elements);
            }
        });
    }

    function rotateElementsLeft(elements) {
        var count = elements.length;
        for (var i = 0; i < count; i++) {
            var element = elements[i];
            var index = parseInt(element.dataset.index);
            index -= 1;
            if (index < 0) {
                index = count - 1;
            }
            element.dataset.index = index;
        }
        assignElementsClasses(elements);
    }

    function rotateElementsRight(elements) {
        var count = elements.length;
        for (var i = 0; i < count; i++) {
            var element = elements[i];
            var index = parseInt(element.dataset.index);
            index = (index + 1) % count;
            element.dataset.index = index;
        }
        assignElementsClasses(elements);
    }

    function assignElementsClasses(elements) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            element.classList.remove('left-out');
            element.classList.remove('left');
            element.classList.remove('center');
            element.classList.remove('right');
            element.classList.remove('right-out');
            element.classList.remove('hide');
            var index = parseInt(element.dataset.index);
            switch (index) {
                case 0:
                    element.classList.add('left-out');
                    break;
                case 1:
                    element.classList.add('left');
                    break;
                case 2:
                    element.classList.add('center');
                    break;
                case 3:
                    element.classList.add('right');
                    break;
                case 4:
                    element.classList.add('right-out');
                    break;
                default:
                    element.classList.add('hide');
                    break;
            }
        }
    }
}
