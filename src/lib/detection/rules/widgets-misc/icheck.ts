import type { TechnologyDefinition } from '../../types';

export const icheckTechnologyDefinition = {
	id: "icheck",
	name: "iCheck",
	website: "https://github.com/drgullin/icheck",
	description: "iCheck is a library for customizable checkboxes and radio buttons.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "icheck:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:js|iCheck)\\/icheck\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "icheck:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:js|icheck)\\/icheck\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
