const DEFAULT_MS = 5000;
const TEMPO_MS = 900000;

let timeoutID;
let ms = DEFAULT_MS;
let isActive = false;
let nbGift = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.data) {
		case "switch":
			isActive = !isActive;
			isActive ? startInterval(DEFAULT_MS) : stopInterval();
			sendResponse({isActive: isActive, nbGift: nbGift});
			break;
		case "getTabInfo":
			sendResponse({isActive: isActive, nbGift: nbGift});
			break;
	}
});

const getGift = () => {
	const gift = document.getElementsByClassName("tw-button tw-button--success");
	if (gift.length) {
		gift[0].click();
		++nbGift;
		console.log("Gift Earned!");
		ms = TEMPO_MS;
		chrome.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, () => chrome.runtime.lastError);
	}
};

const interval = () => {
	getGift();
	timeoutID = setTimeout(interval, ms);
	ms = DEFAULT_MS;
};

const startInterval = (ms) => {
	console.log("Activated");
	interval();
};

const stopInterval = () => {
	console.log("Deactivated");
	clearTimeout(timeoutID);
};
