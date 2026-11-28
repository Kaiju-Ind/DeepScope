import type { TechnologyDefinition } from "../../types.ts";
import { colorSchemeTechnologyDefinition } from "./color-scheme.ts";
import { containerQueriesTechnologyDefinition } from "./container-queries.ts";
import { cssColorMixTechnologyDefinition } from "./css-color-mix.ts";
import { cssCornerShapeTechnologyDefinition } from "./css-corner-shape.ts";
import { cssCustomFunctionsTechnologyDefinition } from "./css-custom-functions.ts";
import { cssCustomPropertiesTechnologyDefinition } from "./css-custom-properties.ts";
import { cssDetailsContentTechnologyDefinition } from "./css-details-content.ts";
import { cssGridLayoutTechnologyDefinition } from "./css-grid-layout.ts";
import { cssInterpolateSizeTechnologyDefinition } from "./css-interpolate-size.ts";
import { cssReadingFlowTechnologyDefinition } from "./css-reading-flow.ts";
import { cssRubyOverhangTechnologyDefinition } from "./css-ruby-overhang.ts";
import { emotionTechnologyDefinition } from "./emotion.ts";
import { flexboxLayoutTechnologyDefinition } from "./flexbox-layout.ts";
import { fluidTypographyTechnologyDefinition } from "./fluid-typography.ts";
import { jssTechnologyDefinition } from "./jss.ts";
import { lessTechnologyDefinition } from "./less.ts";
import { postcssTechnologyDefinition } from "./postcss.ts";
import { sassTechnologyDefinition } from "./sass.ts";
import { stitchesTechnologyDefinition } from "./stitches.ts";
import { styledComponentsTechnologyDefinition } from "./styled-components.ts";
import { stylusTechnologyDefinition } from "./stylus.ts";
import { perceptualColorSpacesTechnologyDefinition } from "./perceptual-color-spaces.ts";
import { variableFontsTechnologyDefinition } from "./variable-fonts.ts";
import { cssCascadeLayersTechnologyDefinition } from "./css-cascade-layers.ts";
import { cssPropertyRuleTechnologyDefinition } from "./css-property-rule.ts";
import { cssSubgridTechnologyDefinition } from "./css-subgrid.ts";
import { cssHasSelectorTechnologyDefinition } from "./css-has-selector.ts";
import { cssStartingStyleTechnologyDefinition } from "./css-starting-style.ts";
import { cssContentVisibilityTechnologyDefinition } from "./css-content-visibility.ts";
import { cssContainerQueryUnitsTechnologyDefinition } from "./css-container-query-units.ts";

/** Technology definitions in the styling processor category folder. */
export const stylingProcessorTechnologyDefinitions = [
	colorSchemeTechnologyDefinition,
	containerQueriesTechnologyDefinition,
	cssColorMixTechnologyDefinition,
	cssCornerShapeTechnologyDefinition,
	cssCustomFunctionsTechnologyDefinition,
	cssCustomPropertiesTechnologyDefinition,
	cssDetailsContentTechnologyDefinition,
	cssGridLayoutTechnologyDefinition,
	cssInterpolateSizeTechnologyDefinition,
	cssReadingFlowTechnologyDefinition,
	cssRubyOverhangTechnologyDefinition,
	emotionTechnologyDefinition,
	flexboxLayoutTechnologyDefinition,
	fluidTypographyTechnologyDefinition,
	jssTechnologyDefinition,
	lessTechnologyDefinition,
	postcssTechnologyDefinition,
	sassTechnologyDefinition,
	stitchesTechnologyDefinition,
	styledComponentsTechnologyDefinition,
	stylusTechnologyDefinition,
	perceptualColorSpacesTechnologyDefinition,
	variableFontsTechnologyDefinition,
	cssCascadeLayersTechnologyDefinition,
	cssPropertyRuleTechnologyDefinition,
	cssSubgridTechnologyDefinition,
	cssHasSelectorTechnologyDefinition,
	cssStartingStyleTechnologyDefinition,
	cssContentVisibilityTechnologyDefinition,
	cssContainerQueryUnitsTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
