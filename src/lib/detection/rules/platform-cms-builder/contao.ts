import type { TechnologyDefinition } from '../../types';

export const contaoTechnologyDefinition = {
	id: "contao",
	name: "Contao",
	website: "https://contao.org",
	description: "Contao is an open source CMS that allows you to create websites and scalable web applications.",
	icon: "Contao.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "contao:dom:0",
			kind: "dom",
			selector: "link[href*='/typolight.css'], link[href*='/contao.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "contao:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Contao Open Source CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "contao:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^contao open source cms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:contao:contao_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
