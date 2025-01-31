function createMushroomCards(mushroomData) {
	return mushroomData.map((mushroom) => {
		const title = document.createElement("h3");
		title.classList.add(["card-heading"]);
		title.innerText = mushroom.name;

		const tagList = document.createElement("ul");
		tagList.classList.add(["flex-group"]);
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
