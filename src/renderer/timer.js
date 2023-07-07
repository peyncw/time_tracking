export default class Timer {

	static #pause = false;

	static #dataStart;
	static #dataPause;

	static start(func) {
		if (!this.#dataStart) {
			this.#dataStart = Date.now();
		}
		if (this.#pause) {
			this.#dataStart = this.#dataStart + (Date.now() - this.#dataPause);
			this.#pause = false;
		}
	}

	static pause() {
		this.#dataPause = Date.now();
		this.#pause = true;
	}

	static stop() {
		this.#dataStart = null;
		this.#dataPause = null;
		if (this.#pause) this.#pause = false;
	}

	static getTime() {
		let date = (this.#pause ? this.#dataPause : Date.now()) - this.#dataStart;
		let toSeconds = Math.floor(date / 1000);

		if (!this.#dataStart) return { hours: 0, minutes: 0, seconds: 0 };
		return {
			seconds: toSeconds % 60 ,
			minutes: Math.floor(toSeconds / 60) % 60,
			hours: Math.floor((toSeconds / 60) / 60) % 60
		};
	}
}