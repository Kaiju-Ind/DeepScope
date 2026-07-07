import type { TechnologyDefinition } from '../../types';

export const pyscriptTechnologyDefinition = {
	id: "pyscript",
	name: "PyScript",
	website: "https://pyscript.net",
	description: "PyScript is a python script that can be run in the browser using a mix of Python and standard HTML.",
	icon: "PyScript.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pyscript:dom:0",
			kind: "dom",
			selector: "py-script",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pyscript:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_mkto_trk$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:pyscript:pyscript:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
