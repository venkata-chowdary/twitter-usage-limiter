chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ numberOfTimes: 0, lastUsedDate: new Date().toDateString() });
});


chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.url.includes("https://x.com/home")) {

        chrome.storage.sync.get(["numberOfTimes", "lastUsedDate"], (data) => {

            const today = new Date().toDateString();

            const { numberOfTimes = 0, lastUsedDate } = data;

            var newCount = 0

            if (lastUsedDate === today) {
                newCount = numberOfTimes + 1;
                chrome.storage.sync.set({ numberOfTimes: newCount })
                if (newCount > 3) {
                    chrome.tabs.update(details.tabId, { url: "https://twitter-blocker-page.vercel.app/" })
                }
            } else {
                chrome.storage.sync.set({ numberOfTimes: 1, lastUsedDate: today })
            }
        });
    }
}, { url: [{ urlMatches: "https://x.com/home" }] });
