import type { TechnologyDefinition } from '../../types';

export const javaserverFacesTechnologyDefinition = {
	id: "javaserver-faces",
	name: "JavaServer Faces",
	website: "https://javaserverfaces.java.net",
	icon: "JavaServer Faces.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "javaserver-faces:dom:0",
			kind: "dom",
			selector: "input[type='hidden'][name='javax.faces.ViewState']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "javaserver-faces:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("JSF(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "javaserver-faces:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("jsf(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
