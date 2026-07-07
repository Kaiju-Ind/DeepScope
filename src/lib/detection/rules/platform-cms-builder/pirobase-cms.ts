import type { TechnologyDefinition } from '../../types';

export const pirobaseCmsTechnologyDefinition = {
	id: "pirobase-cms",
	name: "pirobase CMS",
	website: "https://www.pirobase-imperia.com/de/produkte/produktuebersicht/pirobase-cms",
	icon: "pirobaseCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pirobase-cms:html:0",
			kind: "html",
			pattern: new RegExp("<(?:script|link)[^>]\\/site\\/[a-z0-9/._-]+\\/resourceCached\\/[a-z0-9/._-]+"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "pirobase-cms:html:1",
			kind: "html",
			pattern: new RegExp("<input[^>]+cbi:\\/\\/\\/cms\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "pirobase-cms:dom:2",
			kind: "dom",
			selector: "script[src*='/site/'][src*='/resourceCached/'], link[href*='/site/'][href*='/resourceCached/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pirobase-cms:html:3",
			kind: "html",
			pattern: new RegExp("<(?:script|link)[^>]\\/site\\/[a-z0-9/._-]+\\/resourcecached\\/[a-z0-9/._-]+"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
