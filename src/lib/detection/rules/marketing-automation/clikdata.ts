import type { TechnologyDefinition } from '../../types';

export const clikdataTechnologyDefinition = {
	id: "clikdata",
	name: "CLIKdata",
	website: "https://clikdata.com",
	description: "CLIKdata is a provider of digital marketing and data services that support business growth by enhancing engagement and lead generation.",
	icon: "CLIKdata.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "clikdata:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pixel\\.clikdata\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
