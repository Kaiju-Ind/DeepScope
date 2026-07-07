import type { TechnologyDefinition } from '../../types';

export const harborTechnologyDefinition = {
	id: "harbor",
	name: "Harbor",
	website: "https://goharbor.io",
	description: "Harbor is an open-source registry that secures artifacts with policies and role-based access control, ensures images are scanned and free from vulnerabilities, and signs images as trusted.",
	icon: "Harbor.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "harbor:dom:0",
			kind: "dom",
			selector: "harbor-app",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:linuxfoundation:harbor:*:*:*:*:*:*:*:*",
	},
	implies: [
		"go",
	],
} as const satisfies TechnologyDefinition;
