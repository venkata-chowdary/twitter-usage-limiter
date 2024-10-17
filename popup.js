document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(["numberOfTimes", "timeSpent"], (data) => {
        const { numberOfTimes = 0, timeSpent } = data;


        document.getElementById('visited-time').innerText = numberOfTimes;
        // const minutes = Math.floor( timeSpent / (1000 * 60) );
        // const seconds = Math.floor( (timeSpent % (1000 * 60) ) / 1000);
        
        // const formattedTime = `${String(minutes).padStart(2, '0')}` + `:` + `${String(seconds).padStart(2, '0')}`;

        // document.getElementById('time-spent').innerText = formattedTime;
    });
});
