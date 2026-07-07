import type { TechnologyDefinition } from '../../types';
import { datatablesTechnologyDefinition } from './datatables';
import { handsontableTechnologyDefinition } from './handsontable';
import { tabulatorTechnologyDefinition } from './tabulator';
import { agGridTechnologyDefinition } from './ag-grid';
import { reactTableLegacyTechnologyDefinition } from './react-table-legacy';
import { reactVirtualizedTechnologyDefinition } from './react-virtualized';
import { reactVirtuosoTechnologyDefinition } from './react-virtuoso';
import { reactWindowTechnologyDefinition } from './react-window';
import { tanstackTableTechnologyDefinition } from './tanstack-table';
import { tanstackVirtualTechnologyDefinition } from './tanstack-virtual';

export const tableLibraryTechnologyDefinitions = [
	datatablesTechnologyDefinition,
	handsontableTechnologyDefinition,
	tabulatorTechnologyDefinition,
	agGridTechnologyDefinition,
	reactTableLegacyTechnologyDefinition,
	reactVirtualizedTechnologyDefinition,
	reactVirtuosoTechnologyDefinition,
	reactWindowTechnologyDefinition,
	tanstackTableTechnologyDefinition,
	tanstackVirtualTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
