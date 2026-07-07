import type { TechnologyDefinition } from '../../types';

export const antibotCloudTechnologyDefinition = {
	id: "antibot-cloud",
	name: "AntiBot.Cloud",
	website: "https://antibot.cloud",
	description: "AntiBot. Cloud is a PHP script and cloud service to protect websites from bots and junk traffic.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "antibot-cloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/antibot8\\/static\\/peel\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "antibot-cloud:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("AntiBot\\.Cloud\\sv\\.\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "antibot-cloud:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("antibot\\.cloud\\sv\\.\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
