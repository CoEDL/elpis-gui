import axios from 'axios'

const baseUrl = (process.env.REACT_APP_BASEURL) ? process.env.REACT_APP_BASEURL : 'http://127.0.0.1:5000'

const getApi = (url, successFunction) => {
    return dispatch => {
        axios.get(url)
            .then((response) => {
                // If the API call went OK (HTTP status 200),
                // dispatch the success handler that came with the request
                dispatch(successHandler[successFunction](response))
            }).catch((error) => {
                // For HTTP 400 error responses, dipatch a generic error
                // or we could use a similar pattern as success for custom actions
                dispatch(errorHandler(error))
            })
    }
}

const postApi = (url, postData, successFunction, config=null) => {
    return dispatch => {
        axios.post(url, postData, config)
            .then((response) => {
                console.log('success')
                dispatch(successHandler[successFunction](response))
            }).catch((error) => {
                console.log('error')
                dispatch(errorHandler(error))
            })
    }
}


export const errorHandler = (error) => {
    return { type: 'ERROR', error }
}

var successHandler = {
    newModel: response => ({ type: 'NEW_MODEL', response }),
    updateModelName: response => ({ type: 'UPDATE_MODEL_NAME', response }),
    updateModelDate: response => ({ type: 'UPDATE_MODEL_DATE', response }),
    updateModelSettings: response => ({ type: 'UPDATE_MODEL_SETTINGS', response }),
    updateModelTranscriptionFiles: response => ({ type: 'UPDATE_MODEL_TRANSCRIPTION_FILES', response }),
    // updateModelAdditionalWordFiles: response => ({ type: 'UPDATE_MODEL_ADDITIONAL_WORD_FILES', response }),
    updateModelPronunciationFile: response => ({ type: 'UPDATE_MODEL_PRONUNCIATION_FILE', response }),
    updateNewTranscriptionFile: response => ({ type: 'UPDATE_NEW_TRANSCRIPTION_FILE', response })
}

// * * * * * * * * * * DATA BUNDLES * * * * * * * * * * * * * * *

export const newDataBundle = () => {
    const url = baseUrl + '/api/data-bundle/new';
    return postApi(url, null, 'newDataBundle');
}

export const updateDataBundleName = postData => {
    const url = baseUrl + '/api/data-bundle/name';
    return postApi(url, postData, 'updateDataBundleName');
}

export const updateDataBundleDate = postData => {
    const url = baseUrl + '/api/data-bundle/date';
    return postApi(url, postData, 'updateDataBundleDate');
}

export const updateDataBundleFiles = postData => {
    const url = baseUrl + '/api/model/data-bundle/files';
    const headers = {headers: {'content-type': 'multipart/form-data'}}
    return postApi(url, postData, 'updateDataBundleFiles', headers);
}



// * * * * * * * * * * MODEL * * * * * * * * * * * * * * *

export const newModel = () => {
    const url = baseUrl + '/api/model/new';
    return postApi(url, null, 'newModel');
}

export const updateModelName = postData => {
    const url = baseUrl + '/api/model/name';
    return postApi(url, postData, 'updateModelName');
}

export const updateModelDate = postData => {
    const url = baseUrl + '/api/model/date';
    return postApi(url, postData, 'updateModelDate');
}

export const updateModelPronunciationFile = postData => {
    const url = baseUrl + '/api/model/pronunciation';
    const headers = {headers: {'content-type': 'multipart/form-data'}}
    return postApi(url, postData, 'updateModelPronunciationFile', headers);
}

export const updateModelSettings = postData => {
    const url = baseUrl + '/api/model/settings';
    console.log('postData', postData)
    return postApi(url, postData, 'updateModelSettings');
}
export const getModelLexicon = () => ({ type: 'GET_MODEL_LEXICON' })


// * * * * * * * * * * TRANSCRIPTION * * * * * * * * * * * * * * *

export const updateNewTranscriptionFile = postData => {
    // const url = "http://httpbin.org/post"
    const url = baseUrl + '/api/transcription/audio';
    const headers = {headers: {'content-type': 'multipart/form-data'}}
    return postApi(url, postData, 'updateNewTranscriptionFile', headers);
}


export const setCurrentStep = (urlParams) => ({ type: 'SET_CURRENT_STEP', urlParams })

export const setFilesOverwrite = (status) => ({ type: 'SET_FILES_OVERWRITE', status })

export const triggerApiWaiting = (message) => ({ type: 'TRIGGER_API_WAITING', message })
