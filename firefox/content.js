let isActive = false;
let nbGift = 0;

browser.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, (response) => {
	if (browser.runtime.lastError) {
		console.log("Add on ERROR");
	}
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch(request.data) {
		case "getIsActive":
			sendResponse(isActive);
			break;
		case "switch":
			isActive = !isActive;
			browser.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, (response) => {
				if (browser.runtime.lastError) {
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
		browser.runtime.sendMessage({isActive: isActive, nbGift: nbGift}, (response) => {
			if (browser.runtime.lastError) {
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
