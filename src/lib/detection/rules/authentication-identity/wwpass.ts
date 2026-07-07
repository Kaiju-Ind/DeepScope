import type { TechnologyDefinition } from '../../types';

export const wwpassTechnologyDefinition = {
	id: "wwpass",
	name: "WWPass",
	website: "https://www.wwpass.com",
	description: "WWPass is a solution that enables authentication without the use of usernames, simplifying the login process while maintaining security through alternative methods.",
	icon: "WWPass.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "wwpass:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.wwpass\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wwpass:jsGlobal:1",
			kind: "jsGlobal",
			property: "WWPass.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wwpass:jsGlobal:2",
			kind: "jsGlobal",
			property: "wwpassQRCodeAuth",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
