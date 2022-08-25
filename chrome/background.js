const updateBadge = (tabId, data) => {
	chrome.action.setBadgeText({tabId: tabId, text: data.isActive ? data.nbGift.toString() : "OFF"});
	chrome.action.setBadgeBackgroundColor({tabId: tabId, color: data.isActive ? "green" : "red"});
};

const sendTabsMessage = (request) => {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
			updateBadge(tabs[0].id, !chrome.runtime.lastError ? response : {});
		});
	});
};

updateBadge(null, {});

chrome.action.onClicked.addListener(() => {
	sendTabsMessage({data: "switch"});
});

chrome.tabs.onActivated.addListener(() => {
	sendTabsMessage({data: "getTabInfo"});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	updateBadge(sender.tab.id, request);
});
