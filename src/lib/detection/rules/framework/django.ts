import type { TechnologyDefinition } from '../../types';

export const djangoTechnologyDefinition = {
	id: "django",
	name: "Django",
	website: "https://djangoproject.com",
	description: "Django is a Python-based free and open-source web application framework.",
	icon: "Django.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "django:html:0",
			kind: "html",
			pattern: new RegExp("(?:powered by <a[^>]+>Django ?([\\d.]+)?<\\/a>|<input[^>]*name=[\"']csrfmiddlewaretoken[\"'][^>]*>)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "django:jsGlobal:1",
			kind: "jsGlobal",
			property: "__admin_media_prefix__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "django:jsGlobal:2",
			kind: "jsGlobal",
			property: "django",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "django:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^django_language$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "django:dom:4",
			kind: "dom",
			selector: "input[name='csrfmiddlewaretoken']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "django:html:5",
			kind: "html",
			pattern: new RegExp("(?:powered by <a[^>]+>django ?([\\d.]+)?<\\/a>|<input[^>]*name=[\"']csrfmiddlewaretoken[\"'][^>]*>)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:djangoproject:django:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
