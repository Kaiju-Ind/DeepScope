import type { TechnologyDefinition } from '../../types';

export const auth0LockTechnologyDefinition = {
	id: "auth0-lock",
	name: "Auth0 Lock",
	website: "https://auth0.com/docs/libraries/lock",
	description: "Auth0 Lock enables you to easily add social identity providers, so that your users can log in seamlessly using any desired provider.",
	icon: "Auth0.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "auth0-lock:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/lock\\/([\\d.]+)\\/lock(?:.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"auth0",
	],
} as const satisfies TechnologyDefinition;
