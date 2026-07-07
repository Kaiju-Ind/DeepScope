import type { TechnologyDefinition } from '../../types';

export const flywheelTechnologyDefinition = {
	id: "flywheel",
	name: "Flywheel",
	website: "https://getflywheel.com",
	description: "Flywheel is a managed WordPress hosting platform.",
	icon: "flywheel.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "flywheel:header:0",
			kind: "header",
			key: "x-fw-server",
			valuePattern: new RegExp("^Flywheel(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "flywheel:header:1",
			kind: "header",
			key: "x-fw-server",
			valuePattern: new RegExp("^flywheel(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
