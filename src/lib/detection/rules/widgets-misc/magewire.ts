import type { TechnologyDefinition } from '../../types';

export const magewireTechnologyDefinition = {
	id: "magewire",
	name: "Magewire",
	website: "https://github.com/magewirephp/magewire",
	description: "Magewire is a Laravel Livewire port for Magento 2.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "magewire:jsGlobal:0",
			kind: "jsGlobal",
			property: "Magewire.connection-author",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "magewire:jsGlobal:1",
			kind: "jsGlobal",
			property: "magewire",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"laravel",
		"livewire",
	],
} as const satisfies TechnologyDefinition;
