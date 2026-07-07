import type { TechnologyDefinition } from '../../types';

export const koalaFrameworkTechnologyDefinition = {
	id: "koala-framework",
	name: "Koala Framework",
	website: "https://koala-framework.org",
	description: "Koala Framework is an open-source PHP web application framework designed for scalable and modular development, emphasizing MVC architecture and component-based design.",
	icon: "Koala Framework.png",
	categories: [
		"platform-cms-builder",
		"framework",
	],
	rules: [
		{
			id: "koala-framework:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]+This website is powered by Koala Web Framework CMS"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "koala-framework:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Koala Web Framework CMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "koala-framework:html:2",
			kind: "html",
			pattern: new RegExp("<!--[^>]+this website is powered by koala web framework cms"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "koala-framework:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^koala web framework cms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:koala-framework:koala_framework:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
