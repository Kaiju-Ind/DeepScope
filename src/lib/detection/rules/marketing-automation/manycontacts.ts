import type { TechnologyDefinition } from '../../types';

export const manycontactsTechnologyDefinition = {
	id: "manycontacts",
	name: "ManyContacts",
	website: "https://www.manycontacts.com",
	description: "ManyContacts is an attention-grabbing contact form sitting on top of your website that helps to increase conversion by converting visitors into leads.",
	icon: "ManyContacts.png",
	categories: [
		"marketing-automation",
		"widgets-misc",
	],
	rules: [
		{
			id: "manycontacts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.manycontacts\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
