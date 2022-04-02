export default class HeatMap {
	private static weightedScore(data: [number, number, number]): number {
		return data[0] * 3 + data[1] - data[2] * 3;
	}

	private maxMagnitude: number;

	private maxVotes: number;

	constructor(data: [number, number, number][][]) {
		let mm = 6;
		let maxV = 0;
		data.forEach((row) => {
			row.forEach((v) => {
				const rr = Math.abs(HeatMap.weightedScore(v));
				if (rr > mm) {
					mm = rr;
				}
				const numV = v.reduce((a, x) => a + x);
				if (numV > maxV) { maxV = numV; }
			});
		});
		this.maxMagnitude = mm;
		this.maxVotes = maxV;
	}

	colorOfScore(data: [number, number, number]): string {
		if (this.maxVotes === 0) {
			return 'rgb(128, 128, 128)';
		}
		const voteIntensity = Math.min(data[0], data[2]) / (this.maxVotes / 2);
		const yellowDeviation = Math.floor(voteIntensity * 128);
		const yellow = [128 + yellowDeviation, 128 + yellowDeviation, 128 - yellowDeviation];

		const weight = HeatMap.weightedScore(data);
		const interpolationTarget = weight >= 0 ? [0, 256, 0] : [256, 0, 0];

		const interpDistance = Math.abs(weight / this.maxMagnitude);

		const colors = yellow.map(
			(x, i) => (1 - interpDistance) * x + interpDistance * interpolationTarget[i]
		).map((x) => (x > 255 ? 255 : x));

		return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
	}

	get maximumVotes() {
		return this.maxVotes;
	}
}
