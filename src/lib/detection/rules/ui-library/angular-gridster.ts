import type { TechnologyDefinition } from '../../types';

export const angularGridsterTechnologyDefinition = {
	id: "angular-gridster",
	name: "Angular Gridster",
	website: "https://tiberiuzuld.github.io/angular-gridster2/",
	description: "Gridster is a JavaScript library, with a simple drag-and-drop interface, for creating intuitive, dynamic and customizable layouts in web applications.",
	icon: "Angular.svg",
	categories: [
		"ui-library",
		"graphics-visualization",
		"widgets-misc",
	],
	rules: [
		{
			id: "angular-gridster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("angular-gridster(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
