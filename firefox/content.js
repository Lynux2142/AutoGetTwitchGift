const DEFAULT_MS = 5000;
const TEMPO_MS = 900000;
const regex = new RegExp('^https:\/\/www\.twitch\.tv\/');

let timeoutID;
let isActive = false;
let nbGift = 0;

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
	const gift = document.getElementsByClassName("tw-button tw-button--success");
	if (gift.length <= 0) return (false);
	gift[0].click();
	++nbGift;
	console.log("Gift Earned!");
	browser.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, () => browser.runtime.lastError);
	return (true);
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
	browser.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, () => browser.runtime.lastError);
}
