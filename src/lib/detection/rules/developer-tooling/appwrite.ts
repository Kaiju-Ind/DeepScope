import type { TechnologyDefinition } from '../../types';

export const appwriteTechnologyDefinition = {
	id: "appwrite",
	name: "Appwrite",
	website: "https://appwrite.io",
	description: "Appwrite is an end-to-end backend server for web, mobile or native applications packaged as a set of Docker microservices.",
	icon: "Appwrite.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "appwrite:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("appwrite\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "appwrite:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("cloud\\.appwrite\\.io"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:appwrite:appwrite:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
