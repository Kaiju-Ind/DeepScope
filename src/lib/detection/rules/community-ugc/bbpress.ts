import type { TechnologyDefinition } from '../../types';

export const bbpressTechnologyDefinition = {
	id: "bbpress",
	name: "bbPress",
	website: "https://bbpress.org",
	description: "bbPress is a forum software built to integrate seamlessly with WordPress, allowing discussion forums to run directly within a WordPress blog.",
	icon: "bbPress.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "bbpress:jsGlobal:0",
			kind: "jsGlobal",
			property: "gdbbPressAttachmentsInit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
