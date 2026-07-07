import type { TechnologyDefinition } from '../../types';

export const goodapiTechnologyDefinition = {
	id: "goodapi",
	name: "GoodAPI",
	website: "https://thegoodapi.com",
	description: "GoodAPI is a platform that helps businesses increase conversions while supporting environmental sustainability by planting trees.",
	icon: "GoodAPI.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "goodapi:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.thegoodapi\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
