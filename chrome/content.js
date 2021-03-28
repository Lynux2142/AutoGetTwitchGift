let isActive = false;
let nbGift = 0;

chrome.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, (response) => {
	if (chrome.runtime.lastError) {
		console.log("Add on ERROR");
	}
});

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
	switch(request.data) {
		case "getIsActive":
			sendResponse(isActive);
			break;
		case "switch":
			isActive = !isActive;
			chrome.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, (response) => {
				if (chrome.runtime.lastError) {
					console.log("Add on ERROR");
				}
			});
			console.log(isActive ? "Activated" : "Deactivated");
			sendResponse(isActive);
			break;
		case "getTabInfo":
			sendResponse({isActive: isActive, nbGift: nbGift});
			break;
	}
	sendResponse(null);
});

const getGift = () => {
	const gift = document.getElementsByClassName("tw-button tw-button--success");
	if (gift.length) {
		gift[0].click();
		++nbGift;
		console.log("Gift Earned!");
		chrome.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, (response) => {
			if (chrome.runtime.lastError) {
				console.log("Add on ERROR");
			}
		});
	}
};

setInterval(() => {
	if (isActive) {
		getGift();
	}
}, 5000);
