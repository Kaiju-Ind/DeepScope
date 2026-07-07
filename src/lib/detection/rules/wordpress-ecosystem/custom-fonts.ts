import type { TechnologyDefinition } from '../../types';

export const customFontsTechnologyDefinition = {
	id: "custom-fonts",
	name: "Custom Fonts",
	website: "https://github.com/brainstormforce/custom-fonts",
	description: "Custom Fonts plugin helps you easily embed custom fonts files (woff2, woff, ttf, svg, eot, otf) easily in your WordPress website.",
	icon: "Custom Fonts.png",
	categories: [
		"wordpress-ecosystem",
		"styling-library",
	],
	rules: [
		{
			id: "custom-fonts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/custom-fonts\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
