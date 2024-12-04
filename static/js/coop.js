const minussButton = document.getElementById('minus-s');
const plussButton = document.getElementById('plus-s');
const armsField = document.getElementById('config-1');

const minusdButton = document.getElementById('minus-d');
const plusdButton = document.getElementById('plus-d');
const armedField = document.getElementById('config-2');

const mins = parseInt(armsField.getAttribute('min'));
const maxs = parseInt(armsField.getAttribute('max'));

const mind = parseInt(armedField.getAttribute('min'));
const maxd = parseInt(armedField.getAttribute('max'));

// Decrecer Arms
minussButton.addEventListener('click', function() {
  let currentValue = parseInt(armsField.value);

  if (currentValue > mins) {
    armsField.value = currentValue - 1;
  }

  if (parseInt(armsField.value) == mins) {
    minussButton.style.cursor = 'unset';
    minussButton.style.color = 'var(--white)';
  }
  plussButton.style.cursor = 'pointer';
  plussButton.style.color = 'var(--brown)';
});

// Incrementar Arms
plussButton.addEventListener('click', function() {
  let currentValue = parseInt(armsField.value);
  
  if (currentValue < maxs) {
    armsField.value = currentValue + 1;
  }

  if (parseInt(armsField.value) == maxs) {
    plussButton.style.cursor = 'unset';
    plussButton.style.color = 'var(--white)';
  }
  minussButton.style.cursor = 'pointer';
  minussButton.style.color = 'var(--brown)'
});

// Optionally, disable manual input (only allow the buttons to change the value)
armsField.addEventListener('keydown', function(event) {
  // Prevent entering any characters that aren't numbers or the arrow keys
  if (event.key !== "Backspace" && event.key !== "ArrowUp" && event.key !== "ArrowDown") {
    event.preventDefault();
  }
});

// You can also prevent direct changes through the input field
armsField.addEventListener('input', function() {
  let currentValue = parseInt(armsField.value);
  
  // Ensure the input value stays within the valid range
  if (currentValue < mins) {
    armsField.value = mins;
  } else if (currentValue > maxs) {
    armsField.value = maxs;
  }
});

// Add event listener for the "minus" button (decrement)
minusdButton.addEventListener('click', function() {
  let currentValue = parseInt(armedField.value);
  
  // Decrease the value if it's greater than the minimum
  if (currentValue > mind) {
    armedField.value = currentValue - 1;
  }

  if (parseInt(armedField.value) == mind) {
    minusdButton.style.cursor = 'unset';
    minusdButton.style.color = 'var(--white)';
  }
  plusdButton.style.cursor = 'pointer';
  plusdButton.style.color = 'var(--brown)'
});

// Add event listener for the "plus" button (increment)
plusdButton.addEventListener('click', function() {
  let currentValue = parseInt(armedField.value);
  
  // Increase the value if it's less than the maximum
  if (currentValue < maxd) {
    armedField.value = currentValue + 1;
  }

  if (parseInt(armedField.value) == maxd) {
    plusdButton.style.cursor = 'unset';
    plusdButton.style.color = 'var(--white)';
  }
  minusdButton.style.cursor = 'pointer';
  minusdButton.style.color = 'var(--brown)'
});

// Optionally, disable manual input (only allow the buttons to change the value)
armedField.addEventListener('keydown', function(event) {
  // Prevent entering any characters that aren't numbers or the arrow keys
  if (event.key !== "Backspace" && event.key !== "ArrowUp" && event.key !== "ArrowDown") {
    event.preventDefault();
  }
});

// You can also prevent direct changes through the input field
armedField.addEventListener('input', function() {
  let currentValue = parseInt(armedField.value);
  
  // Ensure the input value stays within the valid range
  if (currentValue < mind) {
    armedField.value = mind;
  } else if (currentValue > maxd) {
    armedField.value = maxd;
  }
});