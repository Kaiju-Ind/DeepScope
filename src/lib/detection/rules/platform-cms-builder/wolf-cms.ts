import type { TechnologyDefinition } from '../../types';

export const wolfCmsTechnologyDefinition = {
	id: "wolf-cms",
	name: "Wolf CMS",
	website: "https://github.com/wolfcms/wolfcms",
	description: "Wolf CMS is an open-source, lightweight content management system written in PHP.",
	icon: "Wolf CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wolf-cms:html:0",
			kind: "html",
			pattern: new RegExp("(?:<a href=\"[^>]+wolfcms\\.org[^>]+>Wolf CMS(?:<\\/a>)? inside|Thank you for using <a[^>]+>Wolf CMS)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wolf-cms:html:1",
			kind: "html",
			pattern: new RegExp("(?:<a href=\"[^>]+wolfcms\\.org[^>]+>wolf cms(?:<\\/a>)? inside|thank you for using <a[^>]+>wolf cms)"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
