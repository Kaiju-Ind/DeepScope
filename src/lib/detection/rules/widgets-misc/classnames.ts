import type { TechnologyDefinition } from '../../types';

export const classnamesTechnologyDefinition = {
	id: "classnames",
	name: "Classnames",
	website: "https://jedwatson.github.io/classnames/",
	description: "Javascript utility for conditionally joining classNames together.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "classnames:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("classnames\\.?\\w{0,20}(?:\\.chunk)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
