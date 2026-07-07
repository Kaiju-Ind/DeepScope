import type { TechnologyDefinition } from '../../types';

export const technology11sightTechnologyDefinition = {
	id: "11sight",
	name: "11Sight",
	website: "https://www.11sight.com",
	description: "11Sight is an AI-powered, omnichannel platform enabling users to receive inbound video calls from any online channel, facilitating sales conversations and lead conversions.",
	icon: "11Sight.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "11sight:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.11sight\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "11sight:jsGlobal:1",
			kind: "jsGlobal",
			property: "elevensight",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "11sight:jsGlobal:2",
			kind: "jsGlobal",
			property: "elevensightApp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
