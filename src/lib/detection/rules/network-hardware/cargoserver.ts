import type { TechnologyDefinition } from '../../types';

export const cargoserverTechnologyDefinition = {
	id: "cargoserver",
	name: "CargoServer",
	website: "https://cargoserver.ch",
	description: "CargoServer is a platform that enables secure data transfer.",
	icon: "CargoServer.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "cargoserver:meta:0",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^CargoServer$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cargoserver:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^cargoserver$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
