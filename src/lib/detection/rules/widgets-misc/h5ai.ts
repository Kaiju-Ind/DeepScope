import type { TechnologyDefinition } from '../../types';

export const h5aiTechnologyDefinition = {
	id: "h5ai",
	name: "h5ai",
	website: "https://github.com/lrsjng/h5ai",
	description: "h5ai is a modern HTTP web server index for Apache httpd, lighttpd, and nginx.",
	icon: "default.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "h5ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/_h5ai\\/(?:public|client)\\/js\\/scripts\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:h5ai_project:h5ai:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
