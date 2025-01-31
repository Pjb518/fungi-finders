import { MushroomList } from "./modules/mushroom-list.js";

function createMushroomCard(mushroom) {
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
	card.style.viewTransitionName = mushroom.name;
	card.append(title, tagList, description, notes);

	return card;
}

function createMushroomTags({ toxicity, season }) {
	const toxicityTag = document.createElement("li");
	toxicityTag.setAttribute("data-toxicity", toxicity);
	toxicityTag.innerText = toxicity;

	const seasonTag = document.createElement("li");
	seasonTag.setAttribute("data-season", season);
	seasonTag.innerText = season;

	return [toxicityTag, seasonTag];
}

async function loadMushroomData() {
	const response = await fetch("./data/mushrooms.json");
	return response.json();
}

function renderMushroomCards() {
	const render = () => {
		mushroomCardsWrapper.innerHTML = "";

		if (!mushroomList.items.length) {
			const noResults = document.createElement("div");
			noResults.classList.add(["no-matches"]);
			noResults.innerText = "No matches for these filters.";

			mushroomCardsWrapper.append(noResults);
		}

		for (const mushroomData of mushroomList.items) {
			const mushroomCard = createMushroomCard(mushroomData);
			mushroomCardsWrapper.append(mushroomCard);
		}
	};

	if (document.startViewTransition) {
		document.startViewTransition(render);
	} else {
		render();
	}
}

const mushroomList = new MushroomList();
const mushroomCardsWrapper = document.getElementById("mushroom-guide-cards");

globalThis.addEventListener("DOMContentLoaded", async () => {
	const mushroomData = await loadMushroomData();

	mushroomList.addObserver(renderMushroomCards);
	mushroomList.add(mushroomData);

	for (const filterType of ["season", "toxicity"]) {
		const selectElement = document.getElementById(`${filterType}Filter`);
		selectElement.removeAttribute("hidden");

		selectElement.addEventListener("change", function () {
			mushroomList.updateFilterValue(filterType, this.value);
		});
	}
});
