import type { TechnologyDefinition } from '../../types';

export const pleromaTechnologyDefinition = {
	id: "pleroma",
	name: "Pleroma",
	website: "https://pleroma.social/",
	description: "Pleroma is a free, federated social networking server built on open protocols.",
	icon: "Pleroma.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "pleroma:html:0",
			kind: "html",
			pattern: new RegExp("To use Pleroma, please enable JavaScript\\.", "i"),
			confidence: 95,
			description: "Document HTML contains Pleroma's no-JavaScript marker.",
		},
		{
			id: "pleroma:text:1",
			kind: "text",
			pattern: new RegExp("^To use Pleroma, please enable JavaScript.$"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "pleroma:html:2",
			kind: "html",
			pattern: new RegExp("<title>\\s*Pleroma\\s*</title>", "i"),
			confidence: 95,
			description: "Document title is Pleroma-specific.",
		},
		{
			id: "pleroma:text:3",
			kind: "text",
			pattern: new RegExp("^Pleroma$"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
