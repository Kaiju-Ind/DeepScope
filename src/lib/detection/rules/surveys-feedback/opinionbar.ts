import type { TechnologyDefinition } from '../../types';

export const opinionbarTechnologyDefinition = {
	id: "opinionbar",
	name: "OpinionBar",
	website: "https://www.opinionbar.com",
	description: "OpinionBar is a platform offering feedback forms and surveys that provide cash payments.",
	icon: "OpinionBar.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "opinionbar:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.opinionbar\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "opinionbar:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.opinionbar\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "opinionbar:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.opinionbar\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
