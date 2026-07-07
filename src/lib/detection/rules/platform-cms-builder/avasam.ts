import type { TechnologyDefinition } from '../../types';

export const avasamTechnologyDefinition = {
	id: "avasam",
	name: "Avasam",
	website: "https://www.avasam.com",
	description: "Avasam is a platform that provides dropship suppliers with channel integration and automation tools to connect and manage online stores.",
	icon: "Avasam.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "avasam:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.avasam\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "avasam:header:1",
			kind: "header",
			key: "Host",
			valuePattern: new RegExp("app\\.avasam\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "avasam:header:2",
			kind: "header",
			key: "X-Forwarded-Host",
			valuePattern: new RegExp("app\\.avasam\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "avasam:header:3",
			kind: "header",
			key: "host",
			valuePattern: new RegExp("app\\.avasam\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "avasam:header:4",
			kind: "header",
			key: "x-forwarded-host",
			valuePattern: new RegExp("app\\.avasam\\.com", "i"),
			description: "Response header matches a known technology marker.",
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
