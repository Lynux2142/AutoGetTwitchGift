window.addEventListener("load", () => {
	const button = document.getElementById("button");
	const range = document.getElementById("range");

	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, {data: "getIsActive"}, (response) => {
			if (!chrome.runtime.lastError) {
				button.innerHTML = response.isActive ? "Pause" : "Start";
			} else {
				button.innerHTML = "Start";
			}
		});
	});
	button.addEventListener("click", () => {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {data: "switch"}, (response) => {
				if (!chrome.runtime.lastError) {
					button.innerHTML = response ? "Pause" : "Start";
				} else {
					button.innerHTML = "Start";
				}
			});
		});
	});
});
