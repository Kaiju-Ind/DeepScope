import type { TechnologyDefinition } from '../../types';

export const typeformTechnologyDefinition = {
	id: "typeform",
	name: "Typeform",
	website: "https://www.typeform.com",
	description: "Typeform is a Spanish online software as a service (SaaS) company that specialises in online form building and online surveys.",
	icon: "Typeform.png",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "typeform:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.typeform\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "typeform:dom:1",
			kind: "dom",
			selector: "link[href*='.typeform.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "typeform:jsGlobal:2",
			kind: "jsGlobal",
			property: "tf.createPopover",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "typeform:jsGlobal:3",
			kind: "jsGlobal",
			property: "tf.createWidget",
			description: "Page-owned global matches a known technology marker.",
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
