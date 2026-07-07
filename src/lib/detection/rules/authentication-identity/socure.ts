import type { TechnologyDefinition } from '../../types';

export const socureTechnologyDefinition = {
	id: "socure",
	name: "Socure",
	website: "https://www.socure.com",
	description: "Socure is an identity management platform that provides tools for verifying, authenticating, and managing digital identities across online services and applications.",
	icon: "Socure.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "socure:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.socure\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "socure:jsGlobal:1",
			kind: "jsGlobal",
			property: "SocureDocVSDK.launch",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
