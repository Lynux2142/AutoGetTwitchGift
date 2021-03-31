const updateBadge = (tabId, data) => {
	browser.browserAction.setBadgeText({tabId: tabId, text: data.isActive ? data.nbGift.toString() : "OFF"});
	browser.browserAction.setBadgeBackgroundColor({tabId: tabId, color: data.isActive ? "green" : "red"});
};

const sendTabsMessage = (request) => {
	browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
		browser.tabs.sendMessage(tabs[0].id, request, (response) => {
			updateBadge(tabs[0].id, !browser.runtime.lastError ? response : {});
		});
	});
};

updateBadge(null, {});

browser.browserAction.onClicked.addListener(() => {
	sendTabsMessage({data: "switch"});
});

browser.tabs.onActivated.addListener(() => {
	sendTabsMessage({data: "getTabInfo"});
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	updateBadge(sender.tab.id, request);
});
