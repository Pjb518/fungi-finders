const CACHE_NAME = "fungi-finders-cache-v1";

const DYNAMIC_ASSETS = ["./data/mushrooms.json"];

const STATIC_ASSETS = [
	"./",
	"./styles.css",
	"./main.js",
	"./mushroom-cards.js",
	"./assets/best-seasons.webp",
	"./assets/botanical-expertise.webp",
	"./assets/culinary-delight.webp",
	"./assets/favicon-16.png",
	"./assets/favicon-32.png",
	"./assets/favicon-96.png",
	"./assets/fungi-finders.svg",
	"./assets/get-to-know.webp",
	"./assets/hamburger.svg",
	"./assets/hero.webp",
	"./assets/identify-mushrooms.webp",
	"./assets/nature.webp",
	"./assets/outdoor-exploration.webp",
	"./assets/start-foraging.webp",
	"./assets/where-to-find.webp",
	"./assets/where-to-look.webp",
	"./fonts/Firasans-Bold.woff2",
	"./fonts/Firasans-Regular.woff2",
	"./fonts/Outfit-VariableFont_wght.woff2",
];

async function cacheFirst(request) {
	const cache = await caches.open(CACHE_NAME);
	const cachedResponse = await cache.match(request);

	return cachedResponse || fetch(request);
}

async function staleWhileRevalidate(request) {
	const cache = await caches.open(CACHE_NAME);

	const networkResponsePromise = fetch(request).then((networkResponse) => {
		cache.put(request, networkResponse.clone());
		return networkResponse;
	});

	const cachedResponse = await cache.match(request);
	return cachedResponse || networkResponsePromise;
}

self.addEventListener("install", async (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				console.log("Opened cache");

				const stack = [];

				for (const file of [...STATIC_ASSETS, ...DYNAMIC_ASSETS]) {
					stack.push(
						cache
							.add(file)
							.catch((_) => console.error(`can't load ${file} to cache`)),
					);
				}

				return Promise.all(stack);
				// return cache.addAll([...STATIC_ASSETS, ...DYNAMIC_ASSETS]);
			})
			.catch((error) => {
				console.error("Failed to open cache or add resources", error);
			}),
	);
});

self.addEventListener("fetch", (event) => {
	if (event.request.url.endsWith(".json")) {
		event.respondWith(staleWhileRevalidate(event.request));
	} else {
		event.respondWith(cacheFirst(event.request));
	}
});

self.addEventListener("activate", (event) => {
	const cacheWhitelist = [CACHE_NAME];

	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
});
