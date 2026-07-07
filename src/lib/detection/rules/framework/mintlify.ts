import type { TechnologyDefinition } from '../../types';

export const mintlifyTechnologyDefinition = {
	id: "mintlify",
	name: "Mintlify",
	website: "https://mintlify.com",
	description: "Mintlify is a platform that enables developers to create and maintain documentation for their projects using Markdown format and automatically generate and deploy static websites via a continuous integration and deployment system.",
	icon: "Mintlify.svg",
	categories: [
		"framework",
		"content-publishing",
	],
	rules: [
		{
			id: "mintlify:jsGlobal:0",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.favicons.browserconfig",
			valuePattern: new RegExp("mintlify\\..+\\.amazonaws\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mintlify:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.mintlify\\.app|\\/mintlify-assets\\/_next\\/static\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "mintlify:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Mintlify$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
