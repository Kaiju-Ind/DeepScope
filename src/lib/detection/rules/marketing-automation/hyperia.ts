import type { TechnologyDefinition } from '../../types';

export const hyperiaTechnologyDefinition = {
	id: "hyperia",
	name: "Hyperia",
	website: "https://www.hyperia.sk",
	description: "Hyperia is a tool designed for lead generation and affiliate marketing.",
	icon: "Hyperia.svg",
	categories: [
		"marketing-automation",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "hyperia:jsGlobal:0",
			kind: "jsGlobal",
			property: "_config.base_url",
			valuePattern: new RegExp("\\.hyperia\\.sk"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hyperia:jsGlobal:1",
			kind: "jsGlobal",
			property: "_config.socket_url",
			valuePattern: new RegExp("\\.hyperia\\.sk"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hyperia:jsGlobal:2",
			kind: "jsGlobal",
			property: "_config.tracker_url",
			valuePattern: new RegExp("\\.hyperia\\.sk"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
