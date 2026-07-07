import type { TechnologyDefinition } from '../../types';

export const theArenaGroupTechnologyDefinition = {
	id: "the-arena-group",
	name: "The Arena Group",
	website: "https://thearenagroup.net",
	description: "The Arena Group is a media coalition of professional content destinations. It operates on a shared digital publishing, advertising, and distribution platform, providing a major media-scale alternative to news and information distributed on social platforms.",
	icon: "The Arena Group.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "the-arena-group:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Tempest\\s-\\smaven\\.io$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "the-arena-group:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^tempest\\s-\\smaven\\.io$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
