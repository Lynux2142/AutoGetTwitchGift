let isActive = false;

chrome.browserAction.setBadgeText({text: "OFF"});
chrome.browserAction.setBadgeBackgroundColor({color: "red"});

chrome.browserAction.onClicked.addListener((tab) => {
	isActive = !isActive;
	chrome.tabs.query({active: true, currentWindow: true}, () => {
		chrome.tabs.sendMessage(tab.id, {isActive: isActive}, (response) => {
			if (response != true) {
				alert("Add on ERROR");
			}
		});
	});
	chrome.browserAction.setBadgeText({text: isActive ? "ON" : "OFF"});
	chrome.browserAction.setBadgeBackgroundColor({color: isActive ? "green" : "red"});
});
