browser.browserAction.setBadgeText({text: "OFF"});
browser.browserAction.setBadgeBackgroundColor({color: "red"});

browser.tabs.onActivated.addListener(() => {
	browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {data: "getTabInfo"}, (response) => {
			if (!browser.runtime.lastError) {
				browser.browserAction.setBadgeText({text: response.isActive ? response.nbGift.toString() : "OFF"});
				browser.browserAction.setBadgeBackgroundColor({color: response.isActive ? "green" : "red"});
			} else {
				browser.browserAction.setBadgeText({text: "OFF"});
				browser.browserAction.setBadgeBackgroundColor({color: "red"});
			}
		});
	});
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (sender.tab && sender.tab.active) {
		browser.browserAction.setBadgeText({text: request.isActive ? request.nbGift.toString() : "OFF"});
		browser.browserAction.setBadgeBackgroundColor({color: request.isActive ? "green" : "red"});
	}
	sendResponse(true);
});
