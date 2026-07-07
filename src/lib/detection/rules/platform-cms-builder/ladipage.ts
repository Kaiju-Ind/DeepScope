import type { TechnologyDefinition } from '../../types';

export const ladipageTechnologyDefinition = {
	id: "ladipage",
	name: "Ladipage",
	website: "https://ladipage.vn",
	description: "Ladipage is a landing page designing platform that helps businesses to promote sales by advertising their products and services.",
	icon: "Ladipage.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ladipage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("w\\.ladicdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ladipage:jsGlobal:1",
			kind: "jsGlobal",
			property: "LadiPageApp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ladipage:jsGlobal:2",
			kind: "jsGlobal",
			property: "LadiPageCommand",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ladipage:jsGlobal:3",
			kind: "jsGlobal",
			property: "LadiPageScript",
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
