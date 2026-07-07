import type { TechnologyDefinition } from '../../types';

export const allianceAuthTechnologyDefinition = {
	id: "alliance-auth",
	name: "Alliance Auth",
	website: "https://gitlab.com/allianceauth/allianceauth",
	description: "Alliance Auth is an access management platform designed for Eve Online groups. It controls access to applications and services based on in-game memberships.",
	icon: "Alliance Auth.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "alliance-auth:dom:0",
			kind: "dom",
			selector: "link[rel='stylesheet'][href*='/static/allianceauth/css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"bootstrap",
		"django",
		"font-awesome",
		"jquery",
		"python",
	],
} as const satisfies TechnologyDefinition;
