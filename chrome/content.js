const DEFAULT_MS = 5000;
const TEMPO_MS = 900000;
const BUTTON_CLASS_NAME = "Layout-sc-nxg1ff-0 kMEhJO";
const regex = new RegExp('^https:\/\/www\.twitch\.tv\/');

let timeoutID;
let isActive = false;
let nbGift = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.data) {
		case "switch":
			isActive = !isActive;
			isActive ? startInterval() : stopInterval();
			sendResponse({isActive: isActive, nbGift: nbGift});
			break;
		case "getTabInfo":
			sendResponse({isActive: isActive, nbGift: nbGift});
			break;
	}
});

const getGift = () => {
	try {
		const gift = document.querySelectorAll(`[data-test-selector="community-points-summary"]`)[0]
			.getElementsByTagName("button")[1];
		gift.click();
		++nbGift;
		console.log("Gift Earned!");
		chrome.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, () => chrome.runtime.lastError);
		return (true);
	} catch (e) {
		return (false);
	}
};

const interval = () => {
	timeoutID = setTimeout(interval, (getGift() ? TEMPO_MS : DEFAULT_MS));
};

const startInterval = () => {
	console.log("Activated");
	interval();
};

const stopInterval = () => {
	console.log("Deactivated");
	clearTimeout(timeoutID);
};

if (regex.test(location.href)) {
	isActive = true;
	interval();
	chrome.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, () => chrome.runtime.lastError);
}
