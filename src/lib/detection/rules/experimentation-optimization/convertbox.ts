import type { TechnologyDefinition } from '../../types';

export const convertboxTechnologyDefinition = {
	id: "convertbox",
	name: "ConvertBox",
	website: "https://convertbox.com",
	description: "ConvertBox is a tool that delivers targeted on-site messages based on visitor behavior to generate more leads, sales, and customers.",
	icon: "ConvertBox.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "convertbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.convertbox\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
