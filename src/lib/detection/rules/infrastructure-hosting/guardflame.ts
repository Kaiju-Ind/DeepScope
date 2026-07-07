import type { TechnologyDefinition } from '../../types';

export const guardflameTechnologyDefinition = {
	id: "guardflame",
	name: "GuardFlame",
	website: "https://hydun.com",
	description: "GuardFlame is a provider of CDN acceleration services that enhance website performance.",
	icon: "GuardFlame.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "guardflame:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^GuardFlame$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "guardflame:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^guardflame$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
