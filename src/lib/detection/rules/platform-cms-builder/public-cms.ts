import type { TechnologyDefinition } from '../../types';

export const publicCmsTechnologyDefinition = {
	id: "public-cms",
	name: "Public CMS",
	website: "https://www.publiccms.com",
	description: "Public CMS is a content management system (CMS) designed to help users create, manage, and maintain websites with features for content editing, template customization, and user management.",
	icon: "Public CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "public-cms:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^PUBLICCMS_USER$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "public-cms:header:1",
			kind: "header",
			key: "X-Powered-PublicCMS",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "public-cms:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^publiccms_user$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "public-cms:header:3",
			kind: "header",
			key: "x-powered-publiccms",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:publiccms:publiccms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
