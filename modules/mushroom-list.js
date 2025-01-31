export class MushroomList {
	#filters = {
		season: null,
		toxicity: null,
	};

	#mushrooms = [];
	#observers = new Set();

	get items() {
		return this.#filter();
	}

	add(mushroomData) {
		this.#mushrooms.push(...mushroomData);
		this.notify();
	}

	addObserver(observer) {
		this.#observers.add(observer);
	}

	#filter() {
		return this.#mushrooms.filter((mushroom) => {
			if (
				this.#filters.season !== null &&
				mushroom.season !== this.#filters.season
			) {
				return false;
			}

			if (
				this.#filters.toxicity !== null &&
				mushroom.toxicity !== this.#filters.toxicity
			) {
				return false;
			}

			return true;
		});
	}

	notify() {
		for (const observer of this.#observers) {
			observer();
		}
	}

	updateFilterValue(key, value) {
		let filterValue = value;

		if (value === "all") filterValue = null;

		this.#filters[key] = filterValue;
		this.notify();
	}

	removeObserver(observer) {
		this.#observers.delete(observer);
	}
}
