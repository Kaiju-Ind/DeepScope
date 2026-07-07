import type { TechnologyDefinition } from '../../types';

export const verifypassTechnologyDefinition = {
	id: "verifypass",
	name: "VerifyPass",
	website: "https://verifypass.com",
	description: "VerifyPass is a company which provide secure identity proofing, authentication, and group affiliation verification for teachers and students.",
	icon: "VerifyPass.png",
	categories: [
		"widgets-misc",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "verifypass:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.id\\.services"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "verifypass:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.verifypass\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "verifypass:jsGlobal:2",
			kind: "jsGlobal",
			property: "verifypass_api_instantiator",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "verifypass:jsGlobal:3",
			kind: "jsGlobal",
			property: "verifypass_is_loaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "verifypass:jsGlobal:4",
			kind: "jsGlobal",
			property: "verifypass_popup",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
