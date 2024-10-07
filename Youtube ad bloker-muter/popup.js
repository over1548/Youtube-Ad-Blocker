const toggleSwitch = document.getElementById("toggleSwitch");
const statusText = document.getElementById("status");
const adCounter = document.getElementById("adCounter");

// Load current state and ad counter
chrome.storage.local.get(["adBlockEnabled", "adCount"], function (result) {
    if (result.adBlockEnabled) {
        toggleSwitch.checked = true;
        statusText.textContent = "On";
    } else {
        toggleSwitch.checked = false;
        statusText.textContent = "Off";
    }
    adCounter.textContent = result.adCount || 0;  // Display ad counter
});

// Update toggle switch state and reset counter if needed
toggleSwitch.addEventListener("change", function () {
    const isEnabled = this.checked;
    chrome.storage.local.set({ adBlockEnabled: isEnabled });
    statusText.textContent = isEnabled ? "On" : "Off";

    // Optionally reset ad counter when turning off
    if (!isEnabled) {
        chrome.storage.local.set({ adCount: 0 });
        adCounter.textContent = 0;
    }
});
