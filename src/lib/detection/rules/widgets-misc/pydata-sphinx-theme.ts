import type { TechnologyDefinition } from '../../types';

export const pydataSphinxThemeTechnologyDefinition = {
	id: "pydata-sphinx-theme",
	name: "PyData Sphinx Theme",
	website: "https://pydata-sphinx-theme.readthedocs.io/",
	description: "PyData Sphinx Theme is a styling template for Sphinx documentation tailored to PyData projects.",
	icon: "PyData Sphinx Theme.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pydata-sphinx-theme:dom:0",
			kind: "dom",
			selector: "p.theme-version",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pydata-sphinx-theme:text:1",
			kind: "text",
			pattern: new RegExp("PyData Sphinx Theme ([\\d]+(?:\\.[\\d]+)*)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page text contains a known PyData Sphinx Theme signature.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"sphinx",
	],
} as const satisfies TechnologyDefinition;
