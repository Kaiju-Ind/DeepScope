import type { TechnologyDefinition } from '../../types';

export const getresponseTechnologyDefinition = {
	id: "getresponse",
	name: "GetResponse",
	website: "https://www.getresponse.com",
	description: "GetResponse is an email marketing app that allows you to create a mailing list and capture data onto it.",
	icon: "GetResponse.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "getresponse:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getresponse\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "getresponse:dom:1",
			kind: "dom",
			selector: "form[action*='.getresponse.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "getresponse:jsGlobal:2",
			kind: "jsGlobal",
			property: "GRAPP",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "getresponse:jsGlobal:3",
			kind: "jsGlobal",
			property: "GRWF2",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "getresponse:dom:4",
			kind: "dom",
			selector: "getresponse-form",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
