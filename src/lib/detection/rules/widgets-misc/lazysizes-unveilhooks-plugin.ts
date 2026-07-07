import type { TechnologyDefinition } from '../../types';

export const lazysizesUnveilhooksPluginTechnologyDefinition = {
	id: "lazysizes-unveilhooks-plugin",
	name: "LazySizes unveilhooks plugin",
	website: "https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/unveilhooks",
	description: "LazySizes unveilhooks plugin extends lazySizes to lazyload scripts/widgets, background images, styles and video/audio elements.",
	icon: "default.svg",
	categories: [
		"widgets-misc",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "lazysizes-unveilhooks-plugin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ls\\.unveilhooks(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
