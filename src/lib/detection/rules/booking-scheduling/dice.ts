import type { TechnologyDefinition } from '../../types';

export const diceTechnologyDefinition = {
	id: "dice",
	name: "Dice",
	website: "https://dice.fm",
	description: "Dice is an event and ticketing platform that enables users to discover, access, and attend live events through a streamlined digital experience.",
	icon: "Dice.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "dice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widgets\\.dice\\.fm"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dice:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.dice\\.fm"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "dice:jsGlobal:2",
			kind: "jsGlobal",
			property: "DiceEventListWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
