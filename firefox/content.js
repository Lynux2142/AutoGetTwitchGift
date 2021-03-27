let isActive = false;

browser.runtime.sendMessage("getIsActive", (response) => {
	if (response !== null) {
		isActive = response;
	} else {
		alert("Add on ERROR");
	}
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	isActive = request.isActive;
	console.log("Add on is " + (isActive ? "activated" : "desactivated"));
	sendResponse(true);
});

const getGift = () => {
	const gift = document.getElementsByClassName("tw-button tw-button--success");
	if (gift.length) {
		gift[0].click();
		console.log("Gift Earned!");
	}
};

setInterval(() => {
	if (isActive) {
		getGift();
	}
}, 5000);
