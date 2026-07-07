import type { TechnologyDefinition } from '../../types';

export const onlineSuccesTechnologyDefinition = {
	id: "online-succes",
	name: "Online Succes",
	website: "https://www.onlinesucces.nl",
	description: "Online Succes is a Netherlands-based platform offering marketing automation and website visitor tracking.",
	icon: "OnlineSucces.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "online-succes:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("connect\\.onlinesucces\\.nl"),
			description: "Script content contains a bounded technology signature.",
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
