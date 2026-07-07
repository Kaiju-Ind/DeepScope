import type { TechnologyDefinition } from '../../types';

export const amazonCognitoTechnologyDefinition = {
	id: "amazon-cognito",
	name: "Amazon Cognito",
	website: "https://aws.amazon.com/cognito/",
	description: "Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps. Amazon Cognito supports sign-in with social identity providers, such as Apple, Facebook, Google, and Amazon, and enterprise identity providers via SAML 2.0 and OpenID Connect.",
	icon: "Amazon Cognito.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "amazon-cognito:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("cognito-idp\\..+\\.amazonaws\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
	implies: [
		"amazon-web-services",
	],
} as const satisfies TechnologyDefinition;
