import type { TechnologyDefinition } from '../../types';

export const azureAdB2cTechnologyDefinition = {
	id: "azure-ad-b2c",
	name: "Azure AD B2C",
	website: "https://azure.microsoft.com/en-us/services/active-directory/external-identities/b2c/",
	description: "Azure Active Directory B2C is a customer identity access management (CIAM) solution.",
	icon: "AzureADB2C.png",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "azure-ad-b2c:url:0",
			kind: "url",
			pattern: new RegExp("https.+\\.b2clogin\\.com"),
			description: "Page URL matches a known technology marker.",
		},
	],
	implies: [
		"azure",
	],
} as const satisfies TechnologyDefinition;
