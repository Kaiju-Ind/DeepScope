import type { TechnologyDefinition } from '../../types';

export const ultimatelysocialTechnologyDefinition = {
	id: "ultimatelysocial",
	name: "UltimatelySocial",
	website: "https://www.ultimatelysocial.com",
	description: "Ultimately Social (Share Buttons & Sharing Icons) is a plugin that allows you to place fancy social media icons and buttons on your WordPress website.",
	icon: "UltimatelySocial.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "ultimatelysocial:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/ultimate-social-media-icons\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
