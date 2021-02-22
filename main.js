window.addEventListener('load', () => {
    const counterContainer = document.querySelectorAll('.block-show-quantity');
    const buttons = document.querySelectorAll('.btn-click');
    const buttonClear = document.querySelector('.clear-counters');
    const setNewCounter = document.querySelector('.set-counter')
    const defaultColor = 'red';

    let btnClickCounter = {};

    if(localStorage.btnClickTracker) {
        btnClickCounter = JSON.parse(localStorage.btnClickTracker);
    };

    showClick();
    function btnClick(event) {
        const block =  event.target.parentElement;
        let color = getRandomColor();
        let btnStorage = btnClickCounter[event.target.dataset.id];
        block.style.backgroundColor = color;

        if (btnStorage) {
            btnStorage.count += 1;
            btnStorage.color = color;
        } else {
            btnClickCounter[event.target.dataset.id] = { count: 1, color };
        };

        if (btnClickCounter[event.target.dataset.id].count >= 10) {
            btnClickCounter[event.target.dataset.id].color = defaultColor;
        }
        localStorage.btnClickTracker = JSON.stringify(btnClickCounter)

        showClick()
    };

    function showClick() {
        counterContainer.forEach(span => {
            let counter = 0;
            let color = '';
            const block = span.parentElement;

            if(btnClickCounter[span.dataset.id] && btnClickCounter[span.dataset.id].count) {
                counter = btnClickCounter[span.dataset.id].count;
                color = btnClickCounter[span.dataset.id].color;
            }

            block.style.backgroundColor = color;
            span.innerHTML = counter;
        });
    };

    function setCount() {
        const containerPromt = +prompt('Give number of container (1 or 2)');
        const counterPromt = parseFloat(Math.floor(prompt('GIve count')));
        btnClickCounter[`btn-click__${containerPromt}`].count = counterPromt;
      
        if(counterPromt >= 10) {
            btnClickCounter[`btn-click__${containerPromt}`].color = defaultColor
        } else {
            btnClickCounter[`btn-click__${containerPromt}`].color = getRandomColor()
        }

        localStorage.btnClickTracker = JSON.stringify(btnClickCounter);
        showClick();
    }; 

    setNewCounter.addEventListener('click', setCount)

    buttons.forEach(btn => {
        btn.addEventListener('click', btnClick)
    });

    buttonClear.addEventListener('click', () => {
        localStorage.clear();
        btnClickCounter = {};
        showClick();
    });

    function getRandomColor() {
        const colors = [
            getRand(),
            getRand(),
            getRand()
        ]
        return `rgb(${colors})`;
    }
    
    function getRand() {
        return Math.floor(Math.random()*256);
    }

});
