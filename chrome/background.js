chrome.browserAction.setBadgeText({text: "OFF"});
chrome.browserAction.setBadgeBackgroundColor({color: "red"});

const updateBadge = (data) => {
	if (data) {
		chrome.browserAction.setBadgeText({text: data.isActive ? data.nbGift.toString() : "OFF"});
		chrome.browserAction.setBadgeBackgroundColor({color: data.isActive ? "green" : "red"});
	} else {
		chrome.browserAction.setBadgeText({text: "OFF"});
		chrome.browserAction.setBadgeBackgroundColor({color: "red"});
	}
};

const sendTabsMessage = (request) => {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
			updateBadge(!chrome.runtime.lastError ? response : {});
		});
	});
};

chrome.browserAction.onClicked.addListener(() => {
	sendTabsMessage({data: "switch"});
});

chrome.tabs.onActivated.addListener(() => {
	sendTabsMessage({data: "getTabInfo"});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	chrome.browserAction.setBadgeText({tabId: sender.tab.id, text: request.isActive ? request.nbGift.toString() : "OFF"}, () => chrome.runtime.lastError);
	chrome.browserAction.setBadgeBackgroundColor({tabId: sender.tab.id, color: request.isActive ? "green" : "red"}, () => chrome.runtime.lastError);
});
