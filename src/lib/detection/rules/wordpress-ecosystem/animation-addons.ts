import type { TechnologyDefinition } from '../../types';

export const animationAddonsTechnologyDefinition = {
	id: "animation-addons",
	name: "Animation Addons",
	website: "https://animation-addons.com",
	description: "Animation Addons is a WordPress plugin that extends the Elementor page builder with advanced animation effects and widgets for creating visually dynamic content.",
	icon: "Animation Addons.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "animation-addons:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/extension-for-animation-addons\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "animation-addons:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\/animation-addons\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
	requires: [
		"elementor",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
