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

// Retrieve references to the input field and the element to display received text
const textInput = document.getElementById('textInput');
const receivedText = document.getElementById('receivedText');

// Handle text input change event
textInput.addEventListener('input', () => {
    const newText = textInput.value;
    socket.emit('textChange', newText);
});

// Update the UI when receiving text change from the server
socket.on('textChange', newText => {
    receivedText.innerText = newText;
});

socket.on('buttonState', state => {
    console.log('updated state', state);
    buttonState = state;
    updateUI();
});
