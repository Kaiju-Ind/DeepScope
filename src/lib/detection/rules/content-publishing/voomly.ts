import type { TechnologyDefinition } from '../../types';

export const voomlyTechnologyDefinition = {
	id: "voomly",
	name: "Voomly",
	website: "https://www.voomly.com",
	description: "Voomly is a hosted video course system that facilitates the creation, management, and distribution of video-based educational content.",
	icon: "Voomly.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "voomly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.voomly\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "voomly:jsGlobal:1",
			kind: "jsGlobal",
			property: "attachVoomlyPlayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "voomly:jsGlobal:2",
			kind: "jsGlobal",
			property: "voomlyEmbedPlayerApp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
