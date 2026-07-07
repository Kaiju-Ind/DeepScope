import type { TechnologyDefinition } from '../../types';

export const lineLoginTechnologyDefinition = {
	id: "line-login",
	name: "LINE Login",
	website: "https://developers.line.biz/en/services/line-login/",
	description: "LINE Login is an API that allows you to implement a login function into your services, regardless of whether they are web apps or native apps.",
	icon: "LINE.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "line-login:dom:0",
			kind: "dom",
			selector: "a[href*='access.line.me/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "line-login:jsGlobal:1",
			kind: "jsGlobal",
			property: "Constants.authorization_request_url",
			valuePattern: new RegExp("access\\.line\\.me\\/oauth2\\/v([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
