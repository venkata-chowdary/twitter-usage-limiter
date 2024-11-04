chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ numberOfTimes: 0, lastUsedDate: new Date().toDateString(), timeSpent: 0 });
});

let prevTime = 0;
let onTwitter = false;

chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.url.includes("https://x.com/home")) {

        chrome.storage.sync.get(["numberOfTimes", "lastUsedDate"], (data) => {
            const today = new Date().toDateString();
            const { numberOfTimes = 0, lastUsedDate, timeSpent } = data;
            var newCount = 0

            const time = new Date()
            prevTime = time

            if (lastUsedDate === today) {
                newCount = numberOfTimes + 1;
                chrome.storage.sync.set({ numberOfTimes: newCount })
                console.log("visited twitter")
                if (newCount > 300) {
                    chrome.tabs.update(details.tabId, { url: "https://twitter-blocker-page.vercel.app/" })
                }
            } else {
                chrome.storage.sync.set({ numberOfTimes: 1, lastUsedDate: today })
            }
        });
    }
}, { url: [{ urlMatches: "https://x.com/home" }] });



// chrome.tabs.onUpdated.addListener((tabId,removeInfo)=>{
//     console.log(removeInfo)
// })
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    console.log('leaving twitter')
    e.returnValue = '';
});