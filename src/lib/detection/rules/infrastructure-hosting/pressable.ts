import type { TechnologyDefinition } from '../../types';

export const pressableTechnologyDefinition = {
	id: "pressable",
	name: "Pressable",
	website: "https://pressable.com",
	description: "Pressable is a managed hoting platform for WordPress.",
	icon: "pressable.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "pressable:header:0",
			kind: "header",
			key: "host-header",
			valuePattern: new RegExp("^Pressable", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pressable:header:1",
			kind: "header",
			key: "host-header",
			valuePattern: new RegExp("^pressable", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
