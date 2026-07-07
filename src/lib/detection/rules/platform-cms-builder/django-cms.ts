import type { TechnologyDefinition } from '../../types';

export const djangoCmsTechnologyDefinition = {
	id: "django-cms",
	name: "Django CMS",
	website: "https://www.django-cms.org",
	description: "Django CMS is a free and open source content management system platform for publishing content on the World Wide Web and intranets.",
	icon: "Django CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "django-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/djangocms_"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:django-cms:django_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"django",
		"postgresql",
		"python",
	],
} as const satisfies TechnologyDefinition;
