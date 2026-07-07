import type { TechnologyDefinition } from '../../types';

export const zeppelinTechnologyDefinition = {
	id: "zeppelin",
	name: "Zeppelin",
	website: "https://www.zeppelin-group.com",
	description: "Zeppelin is an internet marketing provider platform designed to support digital advertising and online promotional strategies.",
	icon: "Zeppelin.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "zeppelin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cloud\\.zeppelin-group\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
