import type { TechnologyDefinition } from "../../types.ts";
import { applicationNameMetaTechnologyDefinition } from "./application-name-meta.ts";
import { appLinksMetaTechnologyDefinition } from "./app-links-meta.ts";
import { appleSmartAppBannerTechnologyDefinition } from "./apple-smart-app-banner.ts";
import { appleWebAppMetaTechnologyDefinition } from "./apple-web-app-meta.ts";
import { formatDetectionMetaTechnologyDefinition } from "./format-detection-meta.ts";
import { foxappyTechnologyDefinition } from "./foxappy.ts";
import { framework7TechnologyDefinition } from "./framework7.ts";
import { jqtouchTechnologyDefinition } from "./jqtouch.ts";
import { nativeLazyLoadingTechnologyDefinition } from "./native-lazy-loading.ts";
import { onsenUiTechnologyDefinition } from "./onsen-ui.ts";
import { pictureElementTechnologyDefinition } from "./picture-element.ts";
import { responsiveImagesSrcsetTechnologyDefinition } from "./responsive-images-srcset.ts";
import { startiAppTechnologyDefinition } from "./starti-app.ts";
import { themeColorTechnologyDefinition } from "./theme-color.ts";
import { twitterAppCardTechnologyDefinition } from "./twitter-app-card.ts";
import { viewportMetaTechnologyDefinition } from "./viewport-meta.ts";
import { webAppManifestTechnologyDefinition } from "./web-app-manifest.ts";
import { winkTechnologyDefinition } from "./wink.ts";

export const mobileTechnologyDefinitions = [
	applicationNameMetaTechnologyDefinition,
	appLinksMetaTechnologyDefinition,
	appleSmartAppBannerTechnologyDefinition,
	appleWebAppMetaTechnologyDefinition,
	formatDetectionMetaTechnologyDefinition,
	foxappyTechnologyDefinition,
	framework7TechnologyDefinition,
	jqtouchTechnologyDefinition,
	nativeLazyLoadingTechnologyDefinition,
	onsenUiTechnologyDefinition,
	pictureElementTechnologyDefinition,
	responsiveImagesSrcsetTechnologyDefinition,
	startiAppTechnologyDefinition,
	themeColorTechnologyDefinition,
	twitterAppCardTechnologyDefinition,
	viewportMetaTechnologyDefinition,
	webAppManifestTechnologyDefinition,
	winkTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
