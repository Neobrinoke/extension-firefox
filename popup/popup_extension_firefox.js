document.addEventListener("click", (e) => {
	browser.tabs.executeScript( null, {
		file: "/content_scripts/js_content_script.js"
	});

	var gettingActiveTab = browser.tabs.query( { active: true, currentWindow: true } );
	gettingActiveTab.then( (tabs) => {
		browser.tabs.sendMessage( tabs[0].id, { message: "test" } );
	});
});