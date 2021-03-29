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
	chrome.browserAction.setBadgeText({tabId: sender.tab.id, text: request.isActive ? request.nbGift.toString() : "OFF"}, () => chrome.runtime.lastError);
	chrome.browserAction.setBadgeBackgroundColor({tabId: sender.tab.id, color: request.isActive ? "green" : "red"}, () => chrome.runtime.lastError);
	sendResponse(true);
});
