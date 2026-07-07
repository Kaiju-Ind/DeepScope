import type { TechnologyDefinition } from '../../types';

export const smarteditor2TechnologyDefinition = {
	id: "smarteditor2",
	name: "SmartEditor2",
	website: "https://github.com/naver/smarteditor2",
	description: "SmartEditor2 is an open-source JavaScript WYSIWYG HTML editor from NAVER.",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "smarteditor2:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:smarteditor2|se2)\\/.*HuskyEZCreator\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smarteditor2:jsGlobal:1",
			kind: "jsGlobal",
			property: "nhn.husky.EZCreator",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
