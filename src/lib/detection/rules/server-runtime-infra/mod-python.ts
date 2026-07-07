import type { TechnologyDefinition } from '../../types';

export const modPythonTechnologyDefinition = {
	id: "mod-python",
	name: "mod_python",
	website: "https://www.modpython.org",
	description: "Mod_python is an Apache HTTP Server module that integrates the Python programming language with the server. It is intended to provide a Python language binding for the Apache HTTP Server.",
	icon: "mod_python.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "mod-python:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("mod_python(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mod-python:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mod_python(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:apache:mod_python:*:*:*:*:*:*:*:*",
	},
	implies: [
		"apache-http-server",
		"python",
	],
} as const satisfies TechnologyDefinition;
