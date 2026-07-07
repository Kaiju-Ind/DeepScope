import type { TechnologyDefinition } from '../../types';

export const complydogTechnologyDefinition = {
	id: "complydog",
	name: "ComplyDog",
	website: "https://complydog.com",
	description: "ComplyDog is GDPR compliance software that enables software companies to manage data subject requests, automate Data Processing Agreement (DPA) signature workflows, and respond to common compliance inquiries from prospective customers.",
	icon: "ComplyDog.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "complydog:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.complydog\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "complydog:jsGlobal:1",
			kind: "jsGlobal",
			property: "complydog.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "complydog:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^complydog\\-marketing\\.first\\-touch\\-url$", "i"),
			description: "Cookie name matches a known technology marker.",
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
