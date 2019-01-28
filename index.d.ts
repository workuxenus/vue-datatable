// Type definitions for vuejs-datatable 1.5.3
// Project: vue-datatable
// Definitions by: GerkinDev <https://github.com/gerkinDev/>

declare module 'vuejs-datatable'{
	import Vue, { PluginFunction, PluginObject } from 'vue';
	
	class DatatableFactory implements PluginObject<{}> {
		/**
		 * Declares global components exported by vuejs-datatable, & load configs.
		 * You should add table types to the {@link table_types} list before this function is called.
		 * 
		 * @param Vue - The global Vue instance.
		 */
		public install: PluginFunction<{}>;
		

		/**
		 * Controls the definition of default table type.
		 * 
		 * @param use - `true` to use the default type, false otherwise.
		 */
		useDefaultType(use: boolean): this;

		/**
		 * Creates a new table type with a specified prefix, that you can customize using a callback.
		 * 
		 * @param componentName - The name of the component to register.
		 * @param callback - An optional function to execute, that configures the newly created {@link TableType}. It takes a single parameter: the newly created {@link TableType}
		 */
		registerTableType(componentName: string, callback?: (tableType: TableType) => void): this;
	}
	const VuePlugin: DatatableFactory;
	
	export default VuePlugin;
	
	export class TableType{}

	export interface IDataCallbackOptions{
		pageNumber: number;
		pageLength: number;
		sortBy: string;
	}

	/**
	 * A datatable component, with its specific methods
	 * 
	 * @typeParam TRow - The type of the data item handled by the table
	 */
	export interface IVueDatatable<TRow> extends Vue {
		// Props
		name: string;
		columns: ColumnDefinitions<TRow>;
		data: (options: IDataCallbackOptions, callback: (rows: TRow[], rowCount: number) => void) => void;
		filterBy: string;
		rowClasses: null | ((row: TRow) => string) | string;

		// Data
		readonly sortBy: null | IColumnDefinition<TRow>,
		readonly sortDir: null | 'asc' | 'desc',
		readonly totalRows: number,
		readonly page: number,
		readonly perPage: null | number,
		readonly processedRows: TRow[],

		// Computed
		readonly rows: TRow[];
		readonly settings: unknown;
		readonly handler: unknown;
		readonly normalizedColumns: unknown;
		readonly tableClass: string;
		
		// Methods
		getSortDirectionForColumn(columnDefinition: IColumnDefinition<TRow>): 'asc' | 'desc';
		setSortDirectionForColumn(direction: 'asc' | 'desc', columnDefinition: IColumnDefinition<TRow>): void;
		processRows(): void;
		getRowClasses(row: TRow): string;
	}
	
	/**
	 * Description of a single column of a datatable.
	 * 
	 * @typeParam TRow - The type of the item to bind on the row
	 */
	export interface IColumnDefinition<TRow>{
		/**
		 * Text in the heading element
		 */
		label: string;
		/**
		 * Name of the field to get.
		 * You can use `representedAs` for further customization
		 */
		field?: keyof TRow;
		/**
		 * Apply a function on the row to generate the displayed content
		 * 
		 * @param row TRow - The current row to transform and display
		 */
		representedAs?(row: TRow): string;

		/**
		 * Enable sorting on this field.
		 * Default value depends on the type of the field.
		 */
		sortable?: boolean;

		/**
		 * Parse HTML of the content
		 * Defaults to `false`
		 */
		interpolate?: boolean;
	}
	
	/**
	 * Description of all columns of a datatable.
	 * 
	 * @typeParam TRow - The type of the item to bind on the row
	 */
	export type ColumnDefinitions<TRow> = IColumnDefinition<TRow>[];
}
