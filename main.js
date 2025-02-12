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

if ("serviceWorker" in navigator) {
	globalThis.addEventListener("load", async () => {
		try {
			const workerRegistration =
				await navigator.serviceWorker.register("service-worker.js");

			console.log(
				"ServiceWorker registration successful with scope: ",
				workerRegistration.scope,
			);
		} catch (error) {
			console.log("ServiceWorker registration failed: ", error);
		}
	});
}
