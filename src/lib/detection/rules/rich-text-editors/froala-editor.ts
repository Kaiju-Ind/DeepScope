import type { TechnologyDefinition } from '../../types';

export const froalaEditorTechnologyDefinition = {
	id: "froala-editor",
	name: "Froala Editor",
	website: "https://froala.com/wysiwyg-editor",
	description: "Froala Editor is a WYSIWYG HTML Editor written in Javascript that enables rich text editing capabilities for applications.",
	icon: "Froala.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "froala-editor:dom:0",
			kind: "dom",
			selector: ".fr-view, .fr-box, .fr-popup",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "froala-editor:dom:1",
			kind: "dom",
			selector: ".froala-box",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "froala-editor:jsGlobal:2",
			kind: "jsGlobal",
			property: "FroalaEditor.VERSION",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:froala:froala_editor:*:*:*:*:*:*:*:*",
	},
	implies: [
		"font-awesome",
		"jquery",
	],
} as const satisfies TechnologyDefinition;
