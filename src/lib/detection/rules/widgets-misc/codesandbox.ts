import type { TechnologyDefinition } from '../../types';

export const codesandboxTechnologyDefinition = {
	id: "codesandbox",
	name: "CodeSandbox",
	website: "https://codesandbox.io/",
	description: "CodeSandbox is an online code editor and prototyping tool that makes creating and sharing web apps faster.",
	icon: "CodeSandbox.svg",
	categories: [
		"widgets-misc",
		"rich-text-editors",
	],
	rules: [
		{
			id: "codesandbox:dom:0",
			kind: "dom",
			selector: "iframe[src^='https://codesandbox.io/embed/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
