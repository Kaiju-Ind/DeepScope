import type { TechnologyDefinition } from '../../types';

export const livewireTechnologyDefinition = {
	id: "livewire",
	name: "Livewire",
	website: "https://laravel-livewire.com",
	description: "Livewire is a full-stack Laravel framework for building dynamic interfaces.",
	icon: "Livewire.svg",
	categories: [
		"framework",
		"widgets-misc",
	],
	rules: [
		{
			id: "livewire:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("livewire(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "livewire:html:1",
			kind: "html",
			pattern: new RegExp("<[^>]{1,512}\\bwire:"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "livewire:jsGlobal:2",
			kind: "jsGlobal",
			property: "livewire",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "livewire:jsGlobal:3",
			kind: "jsGlobal",
			property: "livewireScriptConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:laravel:livewire:*:*:*:*:*:*:*:*",
	},
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
