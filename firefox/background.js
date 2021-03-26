let isActive = false;

browser.browserAction.setBadgeText({text: "OFF"});
browser.browserAction.setBadgeBackgroundColor({color: "red"});

browser.browserAction.onClicked.addListener((tab) => {
	isActive = !isActive;
	browser.tabs.query({active: true, currentWindow: true}, () => {
		browser.tabs.sendMessage(tab.id, {isActive: isActive}, (response) => {
			if (response != true) {
				alert("Add on ERROR");
			}
		});
	});
	browser.browserAction.setBadgeText({text: isActive ? "ON" : "OFF"});
	browser.browserAction.setBadgeBackgroundColor({color: isActive ? "green" : "red"});
});
