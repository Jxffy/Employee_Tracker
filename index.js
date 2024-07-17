document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const startStopBtn = document.getElementById('startStopBtn');
    const projectBtn = document.getElementById('projectBtn');
    const mainTimer = document.getElementById('mainTimer');
    const weekTotal = document.getElementById('weekTotal');
    const entriesContainer = document.getElementById('entries');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupWindow = document.getElementById('popupWindow');
    const popupInput = document.getElementById('popupInput');
    const createProjectBtn = document.getElementById('createProjectBtn');
    const closeBtn = document.getElementById('closeBtn');
    let timerInterval;
    let isTimerRunning = false;
    let startTime;
    let elapsedTime = 0;
    let weekTotalTime = 0;
    let entries = [];

    closeBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });

    projectBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'flex';
    });

    function updateMainTimer() {
        const now = Date.now();
        elapsedTime = now - startTime;
        mainTimer.textContent = formatTime(elapsedTime);
    }

    function updateWeekTotal() {
        weekTotal.textContent = formatTime(weekTotalTime);
    }

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    startStopBtn.addEventListener('click', () => {
        if (isTimerRunning) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            startStopBtn.textContent = 'START';
            const entryTime = elapsedTime;
            weekTotalTime += entryTime;
            updateWeekTotal();

            const entryIndex = entries.length + 1;
            const entryTask = taskInput.value || 'No description';
            const entryProject = 'Project'; // Placeholder, replace with actual project
            const endTime = Date.now();
            const entryHTML = `
                <div class="entry">
                    <div class="entry-details">
                        <div class="entry-index">${entryIndex}</div>
                        <div class="dot">&#x2022;</div>
                        <div class="entry-task">${entryTask}</div>
                        <div class="entry-project">${entryProject}</div>
                    </div>
                    <div class="entry-controls">
                        <div class="time-marker"></div>
                        <div class="entry-time-range">
                            <span>Start: <span class="entry-start-time">${new Date(startTime).toLocaleTimeString()}</span></span>
                            <span>End: <span class="entry-end-time">${new Date(endTime).toLocaleTimeString()}</span></span>
                        </div>&nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp
                        <span class="entry-time">${formatTime(entryTime)}</span>
                        <button class="play-btn">PLAY</button>
                    </div>
                </div>
            `;
            entries.push({ 
                html: entryHTML, 
                startTime: startTime, 
                endTime: endTime,
                elapsedTime: entryTime,
                timerInterval: null,
                timerRunning: false
            });
            entriesContainer.insertAdjacentHTML('beforeend', entryHTML);

            mainTimer.textContent = '00:00:00';
            elapsedTime = 0;
        } else {
            startTime = Date.now();
            timerInterval = setInterval(updateMainTimer, 1000);
            isTimerRunning = true;
            startStopBtn.textContent = 'STOP';
        }
    });

    createProjectBtn.addEventListener('click', () => {
        const projectName = popupInput.value;
        if (projectName) {
            console.log('Created project:', projectName);
            popupOverlay.style.display = 'none';
            popupInput.value = '';
        }
    });

    entriesContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('play-btn')) {
            const entryIndex = Array.from(entriesContainer.children).indexOf(target.closest('.entry'));
            const entry = entries[entryIndex];
            
            if (!entry.timerRunning) {
                entry.startTime = Date.now() - entry.elapsedTime;
                entry.timerInterval = setInterval(() => {
                    entry.elapsedTime = Date.now() - entry.startTime;
                    document.querySelectorAll('.entry-time')[entryIndex].textContent = formatTime(entry.elapsedTime);
                    updateWeekTotal();
                }, 1000);
                entry.timerRunning = true;
                target.textContent = 'STOP';
            } else {
                clearInterval(entry.timerInterval);
                entry.timerRunning = false;
                entry.endTime = Date.now(); // Update end time to current time
                document.querySelectorAll('.entry-end-time')[entryIndex].textContent = new Date(entry.endTime).toLocaleTimeString();
                target.textContent = 'PLAY';
            }
        }
    });
});
