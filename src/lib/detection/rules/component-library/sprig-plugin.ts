import type { TechnologyDefinition } from '../../types';

export const sprigPluginTechnologyDefinition = {
	id: "sprig-plugin",
	name: "Sprig plugin",
	website: "https://putyourlightson.com/plugins/sprig",
	description: "Sprig is a free plugin for Craft CMS that allows you to create reactive components from Twig templates ​or PHP classes.",
	icon: "Sprig plugin.svg",
	categories: [
		"component-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "sprig-plugin:dom:0",
			kind: "dom",
			selector: "form[sprig], button[sprig], input[sprig], div.sprig-component",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"craft-cms",
	],
} as const satisfies TechnologyDefinition;
