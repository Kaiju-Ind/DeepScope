import type { TechnologyDefinition } from '../../types';

export const statpingTechnologyDefinition = {
	id: "statping",
	name: "Statping",
	website: "https://github.com/statping/statping",
	description: "Statping is an open-source status monitoring tool that helps you to monitor and analyse the performance of your websites, applications, and services. It can monitor multiple endpoints such as HTTP, HTTPS, TCP, DNS, and more.",
	icon: "Statping.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "statping:html:0",
			kind: "html",
			pattern: new RegExp("We're\\s+sorry\\s+but\\s+Statping", "i"),
			confidence: 95,
			description: "Document HTML contains Statping's no-JavaScript app marker.",
		},
		{
			id: "statping:text:1",
			kind: "text",
			pattern: new RegExp("We're\\ssorry\\sbut\\sStatping"),
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"core-js",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
