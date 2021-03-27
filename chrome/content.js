let isActive;

chrome.extension.sendMessage("getIsActive", (response) => {
	if (response !== null) {
		isActive = response;
	} else {
		alert("Add on ERROR");
	}
});

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
	isActive = request.isActive;
	console.log("content: " + isActive);
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
