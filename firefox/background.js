browser.browserAction.setBadgeText({text: "OFF"});
browser.browserAction.setBadgeBackgroundColor({color: "red"});

const updateBadge = (data) => {
	if (data) {
		browser.browserAction.setBadgeText({text: data.isActive ? data.nbGift.toString() : "OFF"});
		browser.browserAction.setBadgeBackgroundColor({color: data.isActive ? "green" : "red"});
	} else {
		browser.browserAction.setBadgeText({text: "OFF"});
		browser.browserAction.setBadgeBackgroundColor({color: "red"});
	}
};

const sendTabsMessage = (request) => {
	browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
		browser.tabs.sendMessage(tabs[0].id, request, (response) => {
			updateBadge(!browser.runtime.lastError ? response : {});
		});
	});
};

browser.browserAction.onClicked.addListener(() => {
	sendTabsMessage({data: "switch"});
});

browser.tabs.onActivated.addListener(() => {
	sendTabsMessage({data: "getTabInfo"});
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	browser.browserAction.setBadgeText({tabId: sender.tab.id, text: request.isActive ? request.nbGift.toString() : "OFF"}, () => browser.runtime.lastError);
	browser.browserAction.setBadgeBackgroundColor({tabId: sender.tab.id, color: request.isActive ? "green" : "red"}, () => browser.runtime.lastError);
});
