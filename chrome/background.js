chrome.browserAction.setBadgeText({text: "OFF"});
chrome.browserAction.setBadgeBackgroundColor({color: "red"});

chrome.tabs.onActivated.addListener((e) => {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, {data: "getTabInfo"}, (response) => {
			if (!chrome.runtime.lastError) {
				chrome.browserAction.setBadgeText({text: response.isActive ? response.nbGift.toString() : "OFF"});
				chrome.browserAction.setBadgeBackgroundColor({color: response.isActive ? "green" : "red"});
			} else {
				chrome.browserAction.setBadgeText({text: "OFF"});
				chrome.browserAction.setBadgeBackgroundColor({color: "red"});
			}
		});
	});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (sender.tab.active) {
		chrome.browserAction.setBadgeText({text: request.isActive ? request.nbGift.toString() : "OFF"});
		chrome.browserAction.setBadgeBackgroundColor({color: request.isActive ? "green" : "red"});
	}
	sendResponse(true);
});
