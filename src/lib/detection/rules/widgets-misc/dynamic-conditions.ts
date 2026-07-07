import type { TechnologyDefinition } from '../../types';

export const dynamicConditionsTechnologyDefinition = {
	id: "dynamic-conditions",
	name: "Dynamic Conditions",
	website: "https://wordpress.org/plugins/dynamicconditions",
	description: "Dynamic Conditions of Widgets is a cutting-edge WordPress plugin that extends the functionality of your website using conditional logic.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "dynamic-conditions:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dynamic-conditions-public\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
