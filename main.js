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

	const resizeObserver = new ResizeObserver(() => {
		document.body.classList.add("resizing");

		requestAnimationFrame(() => {
			document.body.classList.remove("resizing");
		});
	});

	resizeObserver.observe(document.body);
});
