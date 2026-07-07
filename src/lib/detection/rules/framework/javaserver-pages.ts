import type { TechnologyDefinition } from '../../types';

export const javaserverPagesTechnologyDefinition = {
	id: "javaserver-pages",
	name: "JavaServer Pages",
	website: "https://www.oracle.com/technetwork/java/javaee/jsp/index.html",
	icon: "Java.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "javaserver-pages:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("JSP(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "javaserver-pages:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("jsp(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "javaserver-pages:dom:2",
			kind: "dom",
			selector: "form[action*='/common/dispatcher.jsp']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
