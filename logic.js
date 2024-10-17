chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ numberOfTimes: 0, timeSpent: 0, startTime: null, lastUsedDate: new Date().toDateString() });
});


chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.url.includes("https://x.com/home")) {

        chrome.storage.sync.get(["numberOfTimes", "timeSpent", "startTime"], (data) => {
            const { numberOfTimes = 0, timeSpent = 0, startTime } = data;

            let newCount = numberOfTimes + 1;
            chrome.storage.sync.set({ numberOfTimes: newCount })


            if (newCount >=2) {
                chrome.tabs.update(details.tabId, { url: "https://twitter-blocker-page.vercel.app/" })
            }

        });
    }
}, { url: [{ urlMatches: "https://x.com/home" }] });

// chrome.webNavigation.onBeforeNavigate.addListener((details) => {
//     if (details.url.includes("https://x.com/home")) {
//         chrome.storage.sync.get(["timeSpent", "startTime"], (data) => {
//             const { timeSpent, startTime } = data

//             const sessionDuration = Date.now() - startTime

//             chrome.storage.sync.set({ timeSpent: timeSpent + sessionDuration, startTime: null })
//         })
//     }
// }, { url: [{ urlMatches: "https://x.com/home" }] })