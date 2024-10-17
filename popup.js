document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(["numberOfTimes"], (data) => {
        const { numberOfTimes = 0 } = data;
        document.getElementById('visited-time').innerText = numberOfTimes;
    });
});
