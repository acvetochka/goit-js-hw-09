import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMins = document.querySelector('[data-minutes]');
const dataSecs = document.querySelector('[data-seconds]');
let intervalId = null;

button.setAttribute('disabled', 'disabled');

const onPress = () => {
  intervalId = setInterval(() => {
    const currentDate = new Date(input.value);
    const time = currentDate - Date.now();
    const convertTime = convertMs(time);
    updateClockFace(convertTime);
    // console.log(convertTime);
    if (time <= 1000) {
      clearInterval(intervalId);
    }
  }, 1000);

  button.setAttribute('disabled', 'disabled');
};
const options = {
  isActive: false,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      //   alert('Please choose a date in the future');
      return;
    }
  },

  onChange(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  },
};

flatpickr(input, options);

button.addEventListener('click', onPress);

//конвертує мс в дні:години:хвилини:секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

//додає 0 перед годинами/хвилинами/секундами
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Передає значення таймеру в html
function updateClockFace({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMins.textContent = addLeadingZero(minutes);
  dataSecs.textContent = addLeadingZero(seconds);
}
