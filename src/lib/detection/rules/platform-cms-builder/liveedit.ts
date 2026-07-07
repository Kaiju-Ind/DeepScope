import type { TechnologyDefinition } from '../../types';

export const liveeditTechnologyDefinition = {
	id: "liveedit",
	name: "LiveEdit",
	website: "https://liveeditplatform.com",
	description: "LiveEdit is a platform that provides web design, copywriting, and other features for businesses in the health, fitness, wellness, and beauty sectors.",
	icon: "LiveEdit.svg",
	categories: [
		"platform-cms-builder",
		"marketing-automation",
	],
	rules: [
		{
			id: "liveedit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/([\\d\\.]+)\\/liveedit\\.base\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "liveedit:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("www\\.getLiveEdit\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "liveedit:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("www\\.getliveedit\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
