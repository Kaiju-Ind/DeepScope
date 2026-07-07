import type { TechnologyDefinition } from '../../types';

export const webFontLoaderTechnologyDefinition = {
	id: "web-font-loader",
	name: "Web Font Loader",
	website: "https://github.com/typekit/webfontloader",
	description: "WebFont Loader is a versatile JavaScript library that provides enhanced control and flexibility in managing web fonts.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "web-font-loader:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?webfontloader(?:\\.min)?(?:[-\\.][\\d\\w]{0,32})?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
