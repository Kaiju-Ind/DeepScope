import type { TechnologyDefinition } from '../../types';

export const codeigniterTechnologyDefinition = {
	id: "codeigniter",
	name: "CodeIgniter",
	website: "https://codeigniter.com",
	description: "CodeIgniter is an open-source PHP framework for building web applications.",
	icon: "CodeIgniter.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "codeigniter:html:0",
			kind: "html",
			pattern: new RegExp("<input[^>]+name=\"ci_csrf_token\""),
			version: {
				source: "match",
				template: "2+",
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "codeigniter:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^ci_csrf_token$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "codeigniter:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^ci_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "codeigniter:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^exp_last_activity$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "codeigniter:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^exp_tracker$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "codeigniter:requestUrl:5",
			kind: "requestUrl",
			pattern: new RegExp("codeigniter\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "codeigniter:dom:6",
			kind: "dom",
			selector: "input[name*='ci_csrf_token']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:codeigniter:codeigniter:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
