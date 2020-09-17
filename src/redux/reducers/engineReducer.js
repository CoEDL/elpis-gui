import * as actionTypes from '../actionTypes/appActionTypes';
import * as modelActionTypes from '../actionTypes/modelActionTypes';
import urls from 'urls'

const initialEngineState = {
    engine: null,
    engine_list: []
}

var selected_engine = ""

const engine = (state = initialEngineState, action) => {
	switch (action.type) {
		case actionTypes.ENGINE_LOAD_STARTED:
		case actionTypes.ENGINE_LOAD_FAILURE:
		case actionTypes.ENGINE_LIST_STARTED:
		case actionTypes.ENGINE_LIST_FAILURE:
			return {...state}

		case actionTypes.ENGINE_LIST_SUCCESS:
			let engine_list = action.response.data.data.engine_list;
			return { ...state, engine_list };

		case actionTypes.ENGINE_LOAD_SUCCESS:
			selected_engine = action.response.data.data.engine;
			if (!selected_engine) selected_engine = "espnet"
			return { ...state, engine: selected_engine };

		//	listen for model load, and set engine if not already selected
        case modelActionTypes.MODEL_LOAD_SUCCESS:
        	console.log("model load in engine reducer", action.response.data.data.config)
			selected_engine = action.response.data.data.config.engine;
			if (!selected_engine) selected_engine = "espnet"
			return { ...state, engine: selected_engine };

		default:
			return { ...state }
	}

}
export default engine;