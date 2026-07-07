import type { TechnologyDefinition } from '../../types';

export const shuttleTechnologyDefinition = {
	id: "shuttle",
	name: "Shuttle",
	website: "https://www.devisto.com",
	description: "Shuttle is a website development platform.",
	icon: "Devisto.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shuttle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("shuttle(?:-assets-new|-storage)\\.s3\\.amazonaws\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shuttle:jsGlobal:1",
			kind: "jsGlobal",
			property: "Shuttle.FrontApp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"amazon-web-services",
		"laravel",
		"php",
	],
} as const satisfies TechnologyDefinition;
