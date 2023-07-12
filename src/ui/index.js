const socket = io();

const toggleBtn = document.getElementById('toggleBtn');

let buttonState = false;

toggleBtn.addEventListener('click', () => {
    buttonState = !buttonState;
    updateUI();
    socket.emit('buttonState', buttonState);
});

const updateUI = () => {

    buttonState
        ? alert("Accident Stop")
        : alert("Accident Start");

    buttonState
        ? toggleBtn.classList.add('on')
        : toggleBtn.classList.remove('on');
    toggleBtn.innerText = buttonState ? 'Start' : 'Stop';
};

socket.on('buttonState', state => {
    console.log('updated state', state);
    buttonState = state;
    updateUI();
});
