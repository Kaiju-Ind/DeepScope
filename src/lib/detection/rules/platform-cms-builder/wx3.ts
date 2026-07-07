import type { TechnologyDefinition } from '../../types';

export const wx3TechnologyDefinition = {
	id: "wx3",
	name: "Wx3",
	website: "https://wx3.com.br",
	description: "Wx3 is a Brazilian e-commerce platform for fashion and retail stores.",
	icon: "Wx3.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wx3:html:0",
			kind: "html",
			pattern: new RegExp("<a [^>]*href=\"https:\\/\\/wx3\\.com\\.br\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wx3:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Wx3", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wx3:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("wx3", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
