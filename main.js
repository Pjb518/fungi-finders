function parseBooleanString(str) {
	return /^true$/i.test(str);
}

globalThis.addEventListener("DOMContentLoaded", () => {
	const navigationButton = document.querySelector(
		"[aria-controls='primary-nav']",
	);

	navigationButton.addEventListener("click", function () {
		const currentExpandedState = parseBooleanString(
			this.getAttribute("aria-expanded"),
		);

		this.setAttribute("aria-expanded", !currentExpandedState);
	});
});
