import type { TechnologyDefinition } from '../../types';

export const constantContactTechnologyDefinition = {
	id: "constant-contact",
	name: "Constant Contact",
	website: "https://www.constantcontact.com",
	description: "Constant Contact is a marketing automation and email marketing solution.",
	icon: "Constant Contact.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "constant-contact:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ctctcdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "constant-contact:dom:1",
			kind: "dom",
			selector: "a[href*='.constantcontact.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "constant-contact:jsGlobal:2",
			kind: "jsGlobal",
			property: "_ctct_m",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "constant-contact:jsGlobal:3",
			kind: "jsGlobal",
			property: "ctctOnLoadCallback",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "constant-contact:dom:4",
			kind: "dom",
			selector: "a[href*='.constantcontact.com/'][target='_blank'], form[action*='.constantcontact.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
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
