import type { TechnologyDefinition } from "../../types.ts";
import { adobeDtmTechnologyDefinition } from "./adobe-dtm.ts";
import { adobeExperiencePlatformLaunchTechnologyDefinition } from "./adobe-experience-platform-launch.ts";
import { commandersActTagcommanderTechnologyDefinition } from "./commanders-act-tagcommander.ts";
import { ensightenTechnologyDefinition } from "./ensighten.ts";
import { facebookPixelAdvancedMatchingTechnologyDefinition } from "./facebook-pixel-advanced-matching.ts";
import { googleTagManagerTechnologyDefinition } from "./google-tag-manager.ts";
import { matomoTagManagerTechnologyDefinition } from "./matomo-tag-manager.ts";
import { tagproTechnologyDefinition } from "./tagpro.ts";
import { tealiumTechnologyDefinition } from "./tealium.ts";
import { yahooTagManagerTechnologyDefinition } from "./yahoo-tag-manager.ts";
import { yottaaTechnologyDefinition } from "./yottaa.ts";

import { shopifyGtmProxyTechnologyDefinition } from "./shopify-gtm-proxy.ts";
export const tagManagementTechnologyDefinitions = [
	adobeDtmTechnologyDefinition,
	adobeExperiencePlatformLaunchTechnologyDefinition,
	commandersActTagcommanderTechnologyDefinition,
	ensightenTechnologyDefinition,
	facebookPixelAdvancedMatchingTechnologyDefinition,
	googleTagManagerTechnologyDefinition,
	matomoTagManagerTechnologyDefinition,
	tagproTechnologyDefinition,
	tealiumTechnologyDefinition,
	yahooTagManagerTechnologyDefinition,
	yottaaTechnologyDefinition,
	shopifyGtmProxyTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
