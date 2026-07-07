import type { TechnologyDefinition } from '../../types';

export const upscopeTechnologyDefinition = {
	id: "upscope",
	name: "Upscope",
	website: "https://upscope.com",
	description: "Upscope is a cobrowsing software enabling real-time website navigation with others, facilitating seamless teamwork and improved customer support.",
	icon: "Upscope.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "upscope:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.upscope\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "upscope:jsGlobal:1",
			kind: "jsGlobal",
			property: "Upscope",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "upscope:jsGlobal:2",
			kind: "jsGlobal",
			property: "Upscope._version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
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
