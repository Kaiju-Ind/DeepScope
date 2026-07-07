import type { TechnologyDefinition } from '../../types';

export const tablesorterTechnologyDefinition = {
	id: "tablesorter",
	name: "Tablesorter",
	website: "https://mottie.github.io/tablesorter/",
	description: "Flexible client-side table sorting.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "tablesorter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)[-\\/](?:dist\\/js\\/)?)?(?:jquery\\.)?tablesorter(?:[\\.\\/]pager)?(?:-custom-controls)?(?:\\.widgets)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
