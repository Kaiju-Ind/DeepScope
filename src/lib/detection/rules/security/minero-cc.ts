import type { TechnologyDefinition } from '../../types';

export const mineroCcTechnologyDefinition = {
	id: "minero-cc",
	name: "Minero.cc",
	website: "https://minero.cc/",
	description: "Minero.cc is a bot that helps run crypto mining application.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "minero-cc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/minero\\.cc\\/lib\\/minero(?:-miner|-hidden)?\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
