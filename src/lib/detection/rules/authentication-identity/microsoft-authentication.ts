import type { TechnologyDefinition } from '../../types';

export const microsoftAuthenticationTechnologyDefinition = {
	id: "microsoft-authentication",
	name: "Microsoft Authentication",
	website: "https://github.com/AzureAD/microsoft-authentication-library-for-js",
	description: "The Microsoft Authentication Library for JavaScript enables both client-side and server-side JavaScript applications to authenticate users using Azure AD for work and school accounts (AAD), Microsoft personal accounts (MSA), and social identity providers like Facebook, Google, LinkedIn, Microsoft accounts, etc. through Azure AD B2C service.",
	icon: "Microsoft.svg",
	categories: [
		"authentication-identity",
		"widgets-misc",
	],
	rules: [
		{
			id: "microsoft-authentication:jsGlobal:0",
			kind: "jsGlobal",
			property: "Msal.Authority",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "microsoft-authentication:jsGlobal:1",
			kind: "jsGlobal",
			property: "msal.authorityInstance",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "microsoft-authentication:jsGlobal:2",
			kind: "jsGlobal",
			property: "msalConfig.auth",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
