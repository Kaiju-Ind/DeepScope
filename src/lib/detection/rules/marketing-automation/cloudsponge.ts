import type { TechnologyDefinition } from '../../types';

export const cloudspongeTechnologyDefinition = {
	id: "cloudsponge",
	name: "CloudSponge",
	website: "https://www.cloudsponge.com",
	description: "CloudSponge is a software-as-a-service tool for importing contacts from address book providers like Gmail, Yahoo Mail, Outlook.com, iCloud and AOL.",
	icon: "CloudSponge.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "cloudsponge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cloudsponge\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cloudsponge:jsGlobal:1",
			kind: "jsGlobal",
			property: "cloudsponge.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cloudsponge:jsGlobal:2",
			kind: "jsGlobal",
			property: "cloudspongeProxy",
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
