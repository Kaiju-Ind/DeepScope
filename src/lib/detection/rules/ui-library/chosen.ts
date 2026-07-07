import type { TechnologyDefinition } from '../../types';

export const chosenTechnologyDefinition = {
	id: "chosen",
	name: "Chosen",
	website: "https://harvesthq.github.io/chosen/",
	description: "Chosen is a jQuery plugin that makes long, unwieldy select boxes much more user-friendly.",
	categories: [
		"ui-library",
		"framework",
	],
	rules: [
		{
			id: "chosen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chosen(?:\\.jquery)?(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
