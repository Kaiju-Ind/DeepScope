import type { TechnologyDefinition } from '../../types';

export const pelicanTechnologyDefinition = {
	id: "pelican",
	name: "Pelican",
	website: "https://blog.getpelican.com/",
	description: "Pelican is a static site generator written in Python.",
	icon: "pelican.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "pelican:html:0",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"[^>]+getpelican\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "pelican:html:1",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"https?:\\/\\/pelican\\.notmyidea\\.org"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "pelican:html:2",
			kind: "html",
			pattern: new RegExp("(?:powered|built|generated)\\s(?:by|with).*?<a\\s+href(?:\\s)?=(?:\\s)?\"[^\"]*(?:getpelican\\.com|pelican-bootstrap3|pelican-pure|notmyidea\\.org)[^\"]*\".*?>"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
