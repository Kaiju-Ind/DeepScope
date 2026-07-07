import type { TechnologyDefinition } from '../../types';

export const payloadCmsTechnologyDefinition = {
	id: "payload-cms",
	name: "Payload CMS",
	website: "https://payloadcms.com",
	description: "Payload CMS is a headless and extensible JavaScript content management system designed for application development.",
	icon: "PayloadCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "payload-cms:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("payloadcms\\.com|payload-theme"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "payload-cms:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Payload", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "payload-cms:meta:2",
			kind: "meta",
			key: "og:description",
			valuePattern: new RegExp("Payload is a headless CMS and application framework built with TypeScript, Node\\.js, and React\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "payload-cms:meta:3",
			kind: "meta",
			key: "og:site_name",
			valuePattern: new RegExp("^Payload App$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
