import type { TechnologyDefinition } from '../../types';

export const untreeTechnologyDefinition = {
	id: "untree",
	name: "Untree",
	website: "https://untree.co",
	description: "Untree is a provider of free Bootstrap templates for building responsive websites.",
	icon: "Untree.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "untree:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Untree\\.co", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "untree:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("untree\\.co", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"bootstrap",
	],
} as const satisfies TechnologyDefinition;
