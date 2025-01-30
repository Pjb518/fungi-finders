function createMushroomCards(mushroomData) {
	return mushroomData.map((mushroom) => {
		const title = document.createElement("h3");
		title.classList.add(["mushroom-card__title"]);
		title.innerText = mushroom.name;

		const tagList = document.createElement("ul");
		tagList.classList.add(["mushroom-card__tag-list"]);
		tagList.setAttribute("role", "list");
		tagList.append(...createMushroomTags(mushroom));

		const description = document.createElement("p");
		description.innerText = mushroom.description;

		const notes = document.createElement("strong");
		notes.classList.add(["mushroom-card__notes"]);
		notes.innerHTML = `<span>Important information:</span> ${mushroom.notes}`;

		const card = document.createElement("article");
		card.classList.add(["card"]);
		card.append(title, tagList, description, notes);

		return card;
	});
}

function createMushroomTags({ isToxic, harvestSeason }) {
	const mushroomToxicity = isToxic ? "toxic" : "edible";

	const toxicityTag = document.createElement("li");
	toxicityTag.setAttribute("data-toxicity", mushroomToxicity);
	toxicityTag.innerText = mushroomToxicity;

	const seasonTag = document.createElement("li");
	seasonTag.setAttribute("data-season", harvestSeason);
	seasonTag.innerText = harvestSeason;

	return [toxicityTag, seasonTag];
}

function parseBooleanString(str) {
	return /^true$/i.test(str);
}

globalThis.addEventListener("DOMContentLoaded", async () => {
	const response = await fetch("./data/mushrooms.json");
	const mushroomData = await response.json();
	const mushroomCards = createMushroomCards(mushroomData);

	const mushroomCardsWrapper = document.getElementById("mushroom-guide-cards");
	mushroomCardsWrapper.append(...mushroomCards);

	// <article class="mushroom-card"
	// 	<h3>Chanterelle</h3>

	// 	<ul class="mushroom-card__tag-list" role="list">
	// 		<li class="mushroom-card__tag" data-toxicity="edible">
	// 			<span class="visually-hidden">This mushroom is </span> edible
	// 		</li>

	// 		<li class="mushroom-card__tag" data-season="summer">
	// 			<span class="visually-hidden">The best time to harvest this mushroom is </span> summer
	// 		</li>
	// 	</ul>

	// 	<p>
	// 		Golden-yellow, funnel-shaped mushroom with false gills
	// 	</p>

	// 	<strong class="mushroom-card__warnings">
	// 		<span>Important notes:</span> Has toxic lookalikes—learn proper identification
	// 	</strong>
	// </article>
});

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
