import type { TechnologyDefinition } from '../../types';

export const pdfmakeTechnologyDefinition = {
	id: "pdfmake",
	name: "pdfmake",
	website: "https://bpampuch.github.io/pdfmake",
	description: "Client/server side PDF printing in pure JavaScript.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pdfmake:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pdfmake(?:[\\/-]((?:\\d+\\.)+\\d+)\\/(?:build\\/)?)?(?:pdfmake)?(?:vfs_fonts)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
