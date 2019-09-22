import axios from 'axios'
import urls from 'urls'

import {
    DATASET_NEW_STARTED,
    DATASET_NEW_SUCCESS,
    DATASET_NEW_FAILURE,
    DATASET_LOAD_STARTED,
    DATASET_LOAD_SUCCESS,
    DATASET_LOAD_FAILURE,
    DATASET_LIST_STARTED,
    DATASET_LIST_SUCCESS,
    DATASET_LIST_FAILURE,
    DATASET_FILES_STARTED,
    DATASET_FILES_SUCCESS,
    DATASET_FILES_FAILURE
} from '../types/datasetActionTypes';

const baseUrl = (process.env.REACT_APP_BASEURL) ? process.env.REACT_APP_BASEURL : 'http://'+window.location.host

/* * * * * * * * * * * *  NEW * * * * * * * * * * *  */

// make new dataset, then change url to add files page
export function datasetNew(postData) {
    const url = baseUrl + urls.api.dataset.new
    return async dispatch => {
        dispatch(datasetNewStarted())
        await axios.post(url, postData)
            .then( response => {
                dispatch(datasetNewSuccess(response))
            })
            .catch( error => {
                dispatch(datasetNewFailure(error))
                throw error
            })
        return "Made a new dataset OK"
    }
}

const datasetNewStarted = () => ({
    type: DATASET_NEW_STARTED
})
const datasetNewSuccess = response => ({
    type: DATASET_NEW_SUCCESS,
    payload: { ...response }
})
const datasetNewFailure = error => ({
    type: DATASET_NEW_FAILURE,
    payload: { error }
})


/* * * * * * * * * * * *  LOAD * * * * * * * * * * *  */


export function datasetLoad(postData) {
    const url = baseUrl + urls.api.dataset.load
    return async dispatch => {
        dispatch(datasetLoadStarted())
        await axios.post(url, postData)
            .then(response => {
                dispatch(datasetLoadSuccess(response))
            })
            .catch(error => {
                dispatch(datasetLoadFailure(error))
                throw error
            })
        return "Loaded a dataset OK"
    }
}

const datasetLoadStarted = () => ({
    type: DATASET_LOAD_STARTED
})
const datasetLoadSuccess = response => ({
    type: DATASET_LOAD_SUCCESS,
    payload: { ...response }
})
const datasetLoadFailure = error => ({
    type: DATASET_LOAD_FAILURE,
    payload: { error }
})


/* * * * * * * * * * * *  LIST * * * * * * * * * * *  */

export function datasetList() {
    const url = baseUrl + urls.api.dataset.list
    return async dispatch => {
        dispatch(datasetListStarted())
        await axios.post(url)
            .then(response => {
                dispatch(datasetListSuccess(response))
            })
            .catch(error => {
                dispatch(datasetListFailure(error))
                throw error
            })
        return "Listed a dataset OK"
    }
}

const datasetListStarted = () => ({
    type: DATASET_LIST_STARTED
})
const datasetListSuccess = response => ({
    type: DATASET_LIST_SUCCESS,
    payload: { ...response }
})
const datasetListFailure = error => ({
    type: DATASET_LIST_FAILURE,
    payload: { error }
})



/* * * * * * * * * * * *  FILES * * * * * * * * * * *  */

export function datasetFiles(postData) {
    const url = baseUrl + urls.api.dataset.files
    const config = { headers: { 'content-type': 'multipart/form-data' } }
    return async dispatch => {
        dispatch(datasetFilesStarted())
        await axios.post(url, postData, config)
            .then(response => {
                console.log("datasetFiles action got response", response)
                dispatch(datasetFilesSuccess(response))
            })
            .catch(error => {
                dispatch(datasetFilesFailure(error))
                throw error
            })
        return "Added files to a dataset OK"
    }
}

const datasetFilesStarted = () => ({
    type: DATASET_FILES_STARTED
})
const datasetFilesSuccess = response => ({
    type: DATASET_FILES_SUCCESS,
    payload: { ...response }
})
const datasetFilesFailure = error => ({
    type: DATASET_FILES_FAILURE,
    payload: { error }
})



