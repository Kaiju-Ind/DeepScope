import type { TechnologyDefinition } from '../../types';

export const vanillaTechnologyDefinition = {
	id: "vanilla",
	name: "Vanilla",
	website: "https://vanillaforums.org",
	description: "Vanilla is a both a cloud-based (SaaS) open-source community forum software.",
	icon: "Vanilla.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "vanilla:html:0",
			kind: "html",
			pattern: new RegExp("<body id=\"(?:DiscussionsPage|vanilla)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "vanilla:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Vanilla", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "vanilla:html:2",
			kind: "html",
			pattern: new RegExp("<body id=\"(?:discussionspage|vanilla)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "vanilla:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("vanilla", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
