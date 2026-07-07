import type { TechnologyDefinition } from '../../types';

export const moduleFederationTechnologyDefinition = {
	id: "module-federation",
	name: "Module Federation",
	website: "https://webpack.js.org/concepts/module-federation/",
	description: "Module Federation is a webpack technology for dynamically loading parts of other independently deployed builds.",
	icon: "Webpack.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "module-federation:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("data-webpack"),
			confidence: 50,
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "module-federation:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("Container initialization failed as it has already been initialized with a different share scope"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "module-federation:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("container initialization failed as it has already been initialized with a different share scope"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	implies: [
		"webpack",
	],
} as const satisfies TechnologyDefinition;
