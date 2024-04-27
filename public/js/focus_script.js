let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let sessionNumber = 0;
let paused = false;
let pausetime;
let remindInterval = 0;
let nInterval;
let allowNotifications = false;

function startStopTimer() {
  let toRemove = document.getElementById('reminder-set');
  if (toRemove)
    toRemove.remove();

  let startStopButton = document.getElementById('toggle-timer');
  let pauseButton = document.getElementById('pause-timer');
  let endButton = document.getElementById('end-timer');

  if (!running) {
    if (paused) {
      paused = false;
      startTime += new Date().getTime() - pauseTime;
    } else {
      startTime = new Date().getTime();
    }
    
    tInterval = setInterval(getShowTime, 1000);
    if (remindInterval > 0)
        nInterval = setInterval(reminderNotify, 60000*remindInterval);
    running = true;
    startStopButton.style.display = 'none';
    pauseButton.style.display = 'inline';
    endButton.classList.add('show');
  } else {
    clearInterval(tInterval);
    if (remindInterval > 0)
        clearInterval(nInterval);
    if (difference >= 1000) {
      recordSession();
    }
    running = false;
    paused = false;
    startStopButton.style.display = 'inline';
    pauseButton.style.display = 'none';
    endButton.classList.remove('show');
    difference = 0;
  }
}

function pauseTimer() {
  let pauseButton = document.getElementById('pause-timer');
  if (!paused) {
    clearInterval(tInterval);
    if (remindInterval > 0)
        clearInterval(nInterval);
    paused = true;
    pauseTime = new Date().getTime();
    pauseButton.textContent = 'Resume';
  } else {
    paused = false;
    startTime += new Date().getTime() - pauseTime;
    tInterval = setInterval(getShowTime, 1000);
    pauseButton.textContent = 'Pause';
  }
}

function recordSession() {
  let sessionTime = document.getElementById('clock').textContent;
  sessionNumber++;
  let sessionDiv = document.createElement('div');
  sessionDiv.className = 'session';
  sessionDiv.id = 'session-' + sessionNumber;

  let sessionNameSpan = document.createElement('span');
  sessionNameSpan.textContent = 'Session ' + sessionNumber;
  sessionNameSpan.className = 'session-name';

  let sessionTimeSpan = document.createElement('span');
  sessionTimeSpan.textContent = ': ' + sessionTime;
  sessionTimeSpan.className = 'session-time';

  let renameButton = document.createElement('button');
  renameButton.textContent = 'Rename';
  renameButton.onclick = function() { renameSession(sessionNameSpan); };

  sessionDiv.appendChild(sessionNameSpan);
  sessionDiv.appendChild(sessionTimeSpan);
  sessionDiv.appendChild(renameButton);

  document.getElementById('lap-times').appendChild(sessionDiv);
}

function renameSession(sessionNameElement) {
  let newName = prompt('Enter new session name:', sessionNameElement.textContent);
  if (newName !== null && newName.trim() !== '') {
    sessionNameElement.textContent = newName;
  }
}

function handleSessionOptions(selectElement, sessionId) {
  let selectedOption = selectElement.value;
  let sessionDiv = document.getElementById(sessionId);

  if (selectedOption === 'rename') {
    let sessionNameElement = sessionDiv.querySelector('.session-name');
    renameSession(sessionNameElement);
  } 
  selectElement.selectedIndex = 0;
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  document.getElementById('clock').textContent = hours + ':' + minutes + ':' + seconds;
}

function toggleSessionsDisplay() {
  var sessionTimesContainer = document.getElementById('session-times-container');
  if (sessionTimesContainer.style.display === 'none' || !sessionTimesContainer.style.display) {
    sessionTimesContainer.style.display = 'block';
    document.getElementById('toggle-sessions').textContent = 'Hide Sessions';
  } else {
    sessionTimesContainer.style.display = 'none';
    document.getElementById('toggle-sessions').textContent = 'Show Sessions';
  }
}

// Watch for notifications and send on the interval
function reminderNotify() {
    if (allowNotifications) {
        let notification = new Notification(remindInterval + " minute reminder",
            {body: "This is your " + remindInterval + " reminder, drink some water!"})
    }
}

// Set reminder interval and implement notifications
function setRemindInterval() {
    Notification.requestPermission().then((result) => { //result is either granted or denied
        console.log(result);
        if (result === 'granted') {
            allowNotifications = true;
            if (document.getElementById('reminder-interval').value.length > 0) {
                remindInterval = document.getElementById('reminder-interval').value;
                console.log(remindInterval);
                let reminderSet = document.createElement('p');
                reminderSet.innerHTML = 
                    "Your " + remindInterval + " minute reminders will take effect in your next session!";
                reminderSet.classList.add('reminder-set');
                reminderSet.id = 'reminder-set';
                let remindDiv = document.getElementById('reminder-container');
                remindDiv.append(reminderSet);
            }
        }
    })
}

document.getElementById('pause-timer').addEventListener('click', pauseTimer);
document.getElementById('toggle-timer').addEventListener('click', startStopTimer);
document.getElementById('end-timer').addEventListener('click', startStopTimer);
document.getElementById('toggle-sessions').addEventListener('click', toggleSessionsDisplay);
document.getElementById('set-reminder').addEventListener('click', setRemindInterval);

/* Need to implemenet noti. system (User-inputted timer) */


document.getElementById('notes-button').addEventListener('click', function() {
  var notesContainer = document.querySelector('.notes-container');
  if (notesContainer.style.display === "none" || !notesContainer.style.display) {
    notesContainer.style.display = "block";
  } else {
    notesContainer.style.display = "none";
  }
});