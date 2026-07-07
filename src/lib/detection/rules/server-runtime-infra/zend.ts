import type { TechnologyDefinition } from '../../types';

export const zendTechnologyDefinition = {
	id: "zend",
	name: "Zend",
	website: "https://zend.com",
	description: "Zend is a company that provides PHP development tools and solutions, including frameworks, servers, and development environments, to help developers build, deploy, and manage PHP applications.",
	icon: "Zend.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "zend:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^ZENDSERVERSESSID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "zend:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Zend(?:Server)?(?:[\\s/]?([0-9.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "zend:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^zendserversessid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "zend:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("zend(?:server)?(?:[\\s/]?([0-9.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:zend:zend_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
