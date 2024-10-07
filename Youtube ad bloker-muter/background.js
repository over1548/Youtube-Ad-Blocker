function checkForAds(tabId) {
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        func: detectAndRefresh,
    });
}

function detectAndRefresh() {
    const adBanner = document.querySelector('.ytp-ad-player-overlay');
    const adVideo = document.querySelector('.ad-showing');

    if (adBanner || adVideo) {
        // Increment the ad counter
        chrome.storage.local.get("adCount", function (result) {
            const currentCount = result.adCount || 0;
            chrome.storage.local.set({ adCount: currentCount + 1 });
        });
        
        // Refresh the page to skip ads
        location.reload();
    }
}

// Listen for tab updates and run ad check
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes("youtube.com") && changeInfo.status === 'complete') {
        checkForAds(tabId); // Pass tabId here
    }
});
