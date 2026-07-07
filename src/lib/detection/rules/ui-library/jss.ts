import type { TechnologyDefinition } from '../../types';

export const jssTechnologyDefinition = {
	id: "jss",
	name: "JSS",
	website: "https://cssinjs.org/",
	description: "JSS is an authoring tool for CSS which allows you to use JavaScript to describe styles in a declarative, conflict-free and reusable way.",
	icon: "JSS.png",
	categories: [
		"ui-library",
		"developer-tooling",
	],
	rules: [
		{
			id: "jss:dom:0",
			kind: "dom",
			selector: "style[data-jss]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
