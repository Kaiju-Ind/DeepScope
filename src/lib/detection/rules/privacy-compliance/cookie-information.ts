import type { TechnologyDefinition } from '../../types';

export const cookieInformationTechnologyDefinition = {
	id: "cookie-information",
	name: "Cookie Information",
	website: "https://cookieinformation.com",
	description: "Cookie Information is a privacy tech company that develops software that helps making company websites and mobile apps GDPR and ePrivacy compliant.",
	icon: "Cookie Information.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "cookie-information:jsGlobal:0",
			kind: "jsGlobal",
			property: "CookieInformation.config.cdnUrl",
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
