import type { TechnologyDefinition } from '../../types';

export const cloudfyTechnologyDefinition = {
	id: "cloudfy",
	name: "Cloudfy",
	website: "https://www.cloudfy.com",
	description: "Cloudfy is a SaaS-based enterprise-level B2B ecommerce platform designed to streamline online business operations.",
	icon: "Cloudfy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cloudfy:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^CloudfySession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "cloudfy:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Cloudfy;", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cloudfy:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^cloudfysession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "cloudfy:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^cloudfy;", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
