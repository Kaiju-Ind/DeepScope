import type { TechnologyDefinition } from '../../types';

export const redwoodjsTechnologyDefinition = {
	id: "redwoodjs",
	name: "RedwoodJS",
	website: "https://redwoodjs.com",
	description: "RedwoodJS is a full-stack serverless web application framework built by Tom Preston Werner (co-founder of Github) et al.",
	icon: "RedwoodJS.svg",
	categories: [
		"ui-library",
		"framework",
	],
	rules: [
		{
			id: "redwoodjs:dom:0",
			kind: "dom",
			selector: "div#redwood-app",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"graphql",
		"react",
		"typescript",
	],
} as const satisfies TechnologyDefinition;
