let isActive = false;
let nbGift = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.data) {
		case "switch":
			isActive = !isActive;
			console.log(isActive ? "Activated" : "Deactivated");
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
		chrome.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, () => chrome.runtime.lastError);
	}
};

setInterval(() => {
	if (isActive) {
		getGift();
	}
}, 5000);
