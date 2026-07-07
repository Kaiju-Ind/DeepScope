import type { TechnologyDefinition } from '../../types';

export const livecanvasTechnologyDefinition = {
	id: "livecanvas",
	name: "LiveCanvas",
	website: "https://livecanvas.com",
	description: "LiveCanvas is a Bootstrap 5 WordPress page builder.",
	icon: "LiveCanvas.svg",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "livecanvas:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/livecanvas\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	implies: [
		"bootstrap",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
