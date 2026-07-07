import type { TechnologyDefinition } from '../../types';

export const loginWithAmazonTechnologyDefinition = {
	id: "login-with-amazon",
	name: "Login with Amazon",
	website: "https://developer.amazon.com/apps-and-games/login-with-amazon",
	description: "Login with Amazon allows you use your Amazon user name and password to sign into and share information with participating third-party websites or apps.",
	icon: "Amazon.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "login-with-amazon:jsGlobal:0",
			kind: "jsGlobal",
			property: "onAmazonLoginReady",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
