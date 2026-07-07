import type { TechnologyDefinition } from '../../types';

export const websphereTechnologyDefinition = {
	id: "websphere",
	name: "WebSphere",
	website: "https://www.ibm.com/products/websphere-application-server",
	icon: "websphere.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "websphere:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^\\(\\?i\\)ltpatoken$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ibm:websphere_application_server:-:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
