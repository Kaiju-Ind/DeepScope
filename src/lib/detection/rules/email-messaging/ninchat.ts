import type { TechnologyDefinition } from '../../types';

export const ninchatTechnologyDefinition = {
	id: "ninchat",
	name: "Ninchat",
	website: "https://ninchat.com",
	description: "Ninchat is a secure messaging platform designed for organizations to facilitate encrypted communication and collaboration.",
	icon: "Ninchat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ninchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.ninchat\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ninchat:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ninchat.ERROR",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ninchat:jsGlobal:2",
			kind: "jsGlobal",
			property: "NinchatAntics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ninchat:jsGlobal:3",
			kind: "jsGlobal",
			property: "NinchatAsyncInit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
