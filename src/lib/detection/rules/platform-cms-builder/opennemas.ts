import type { TechnologyDefinition } from '../../types';

export const opennemasTechnologyDefinition = {
	id: "opennemas",
	name: "OpenNemas",
	website: "https://www.opennemas.com",
	icon: "OpenNemas.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "opennemas:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("OpenNemas", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "opennemas:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("OpenNemas", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "opennemas:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("opennemas", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "opennemas:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("opennemas", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
