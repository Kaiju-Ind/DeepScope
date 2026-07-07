import type { TechnologyDefinition } from '../../types';

export const sendinblueTechnologyDefinition = {
	id: "sendinblue",
	name: "Sendinblue",
	website: "https://www.sendinblue.com",
	description: "Sendinblue is an email marketing solution for small and medium-sized businesses that want to send and automate email marketing campaigns.",
	icon: "Sendinblue.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "sendinblue:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sib(?:automation|forms)\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sendinblue:dom:1",
			kind: "dom",
			selector: "iframe[src*='sibautomation.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sendinblue:jsGlobal:2",
			kind: "jsGlobal",
			property: "sendinblue",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sendinblue:dns:3",
			kind: "dns",
			valuePattern: new RegExp("\\.sendinblue\\.com", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "sendinblue:dns:4",
			kind: "dns",
			valuePattern: new RegExp("Sendinblue-code", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
