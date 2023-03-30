import { createAction, createReducer } from '@reduxjs/toolkit';

export interface SearchFormState {
	searchText: string | undefined;
	category: string | undefined;
	branch: string | undefined;
	pi: string | undefined;
	status: string | undefined;
	hideClosedOrTerminated: boolean;
	showOnlyRandomized: boolean;
	showOnlyTwoStepOrMultiStep: boolean;
}

/**
 * Initialize the state
 *
 * @author Pavan Kumar Jadda
 * @since 0.2.20
 */
export const getInitialState = () =>
	({
		searchText: '',
		category: '',
		branch: '',
		pi: '',
		status: '',
		hideClosedOrTerminated: true,
		showOnlyRandomized: false,
		showOnlyTwoStepOrMultiStep: false,
	} as SearchFormState);

/**
 * Define Protocol Document Search Form Actions
 *
 * @author Pavan Kumar Jadda
 * @since 0.2.20
 */
export const updateSearchText = createAction<string>('findProtocol/updateSearchText');
export const updateCategory = createAction<string>('findProtocol/updateCategory');
export const updateBranch = createAction<string>('findProtocol/updateBranch');
export const updatePi = createAction<string>('findProtocol/updatePi');
export const updateStatus = createAction<string>('findProtocol/updateStatus');
export const updateHideClosedOrTerminated = createAction<boolean>('findProtocol/updateHideClosedOrTerminated');
export const updateShowOnlyRandomized = createAction<boolean>('findProtocol/updateShowOnlyRandomized');
export const updateShowOnlyTwoStepOrMultiStep = createAction<boolean>('findProtocol/updateShowOnlyTwoStepOrMultiStep');
export const clearForm = createAction('findProtocol/clearForm');

/**
 * Define Protocol Document Search Form Reducer that handles actions
 *
 * @author Pavan Kumar Jadda
 * @since 0.2.20
 */
export const findProtocolSearchFormReducer = createReducer(getInitialState(), (builder) => {
	builder
		.addCase(updateSearchText, (state, action) => {
			state.searchText = action.payload;
		})
		.addCase(updateCategory, (state, action) => {
			state.category = action.payload;
		})
		.addCase(updateBranch, (state, action) => {
			state.branch = action.payload;
		})
		.addCase(updatePi, (state, action) => {
			state.pi = action.payload;
		})
		.addCase(updateStatus, (state, action) => {
			state.status = action.payload;
		})
		.addCase(updateHideClosedOrTerminated, (state, action) => {
			state.hideClosedOrTerminated = action.payload;
		})
		.addCase(updateShowOnlyRandomized, (state, action) => {
			state.showOnlyRandomized = action.payload;
		})
		.addCase(updateShowOnlyTwoStepOrMultiStep, (state, action) => {
			state.showOnlyTwoStepOrMultiStep = action.payload;
		})
		.addCase(clearForm, () => {
			return getInitialState();
		});
});
