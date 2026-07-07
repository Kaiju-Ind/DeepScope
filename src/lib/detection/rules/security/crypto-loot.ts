import type { TechnologyDefinition } from '../../types';

export const cryptoLootTechnologyDefinition = {
	id: "crypto-loot",
	name: "Crypto-Loot",
	website: "https://crypto-loot.com/",
	description: "Crypto-Loot is a browser based web miner for the uPlexa Blockchain.",
	icon: "Crypto-Loot.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "crypto-loot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/crypto-loot\\.com\\/lib\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crypto-loot:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/webmine\\.pro\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crypto-loot:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/cryptoloot\\.pro\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crypto-loot:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("\\/crlt\\.js"),
			confidence: 75,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crypto-loot:jsGlobal:4",
			kind: "jsGlobal",
			property: "CRLT.CONFIG.ASMJS_NAME",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "crypto-loot:jsGlobal:5",
			kind: "jsGlobal",
			property: "CryptoLoot",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
