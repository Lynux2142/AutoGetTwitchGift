setInterval(() => {
	const button = document.getElementsByClassName("tw-button tw-button--success");
	if (button && button.length > 0) {
		button[0].click();
		console.log("Gift Earned");
	} else {
		console.log("No Gift");
	}
}, 10000);
