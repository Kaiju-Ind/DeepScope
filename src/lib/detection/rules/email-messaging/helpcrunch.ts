import type { TechnologyDefinition } from '../../types';

export const helpcrunchTechnologyDefinition = {
	id: "helpcrunch",
	name: "HelpCrunch",
	website: "https://helpcrunch.com",
	description: "HelpCrunch is a customer service software platform designed to support core business communication and customer support needs across organizations.",
	icon: "HelpCrunch.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "helpcrunch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.helpcrunch\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "helpcrunch:jsGlobal:1",
			kind: "jsGlobal",
			property: "HelpCrunch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "helpcrunch:jsGlobal:2",
			kind: "jsGlobal",
			property: "helpcrunchDebug",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
