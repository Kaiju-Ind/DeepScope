import type { TechnologyDefinition } from '../../types';

export const leadbyteTechnologyDefinition = {
	id: "leadbyte",
	name: "LeadByte",
	website: "https://www.leadbyte.co.uk",
	description: "LeadByte is a lead management platform that helps businesses capture, validate, and distribute leads in real time to optimize revenue conversion.",
	icon: "LeadByte.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "leadbyte:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.leadbyte\\.co\\.uk\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leadbyte:dom:1",
			kind: "dom",
			selector: "form[action*='.leadbyte.co.uk/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
