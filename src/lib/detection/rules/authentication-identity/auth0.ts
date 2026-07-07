import type { TechnologyDefinition } from '../../types';

export const auth0TechnologyDefinition = {
	id: "auth0",
	name: "Auth0",
	website: "https://auth0.github.io/auth0.js/index.html",
	description: "Auth0 provides authentication and authorisation as a service.",
	icon: "Auth0.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "auth0:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/auth0(?:-js)?\\/([\\d.]+)\\/auth0(?:.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "auth0:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/auth0-js@([\\d.]+)\\/([a-z]+)\\/auth0\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "auth0:dom:2",
			kind: "dom",
			selector: "link[href*='cdn.auth0.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
		cpe: "cpe:2.3:a:auth0:auth0.js:*:*:*:*:*:node.js:*:*",
	},
} as const satisfies TechnologyDefinition;
