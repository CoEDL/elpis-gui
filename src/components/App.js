import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css'

import {
    Welcome,
    DatasetDashboard,
    DatasetNew,
    DatasetFiles,
    DatasetPrepare,
    DatasetPrepareError,
    PronDictDashboard,
    PronDictNew,
    PronDictL2S,
    PronDictLexicon,
    ModelDashboard,
    ModelNew,
    ModelSettings,
    ModelTrain,
    ModelResults,
    ModelError,
    NewTranscription,
    NewTranscriptionResults
} from './Steps/index';
import PageContainer from './PageContainer';
import urls from 'urls'


class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <PageContainer>
                        <Route path="/" exact component={ Welcome } />

                        <Route path={urls.gui.dataset.index} exact component={ DatasetDashboard } />
                        <Route path={urls.gui.dataset.new} component={ DatasetNew } />
                        <Route path={urls.gui.dataset.files} component={ DatasetFiles } />
                        <Route path={urls.gui.dataset.prepare} exact component={ DatasetPrepare } />
                        <Route path={urls.gui.dataset.prepareError} component={ DatasetPrepareError } />

                        <Route path={urls.gui.pronDict.index} exact component={PronDictDashboard} />
                        <Route path={urls.gui.pronDict.new} component={PronDictNew} />
                        <Route path={urls.gui.pronDict.l2s} component={PronDictL2S} />
                        <Route path={urls.gui.pronDict.lexicon} component={PronDictLexicon} />

                        <Route path={urls.gui.model.index} exact component={ ModelDashboard } />
                        <Route path={urls.gui.model.new} component={ ModelNew } />
                        <Route path={urls.gui.model.settings} component={ ModelSettings } />
                        <Route path={urls.gui.model.train} exact component={ ModelTrain } />
                        <Route path={urls.gui.model.results} exact component={ ModelResults } />
                        <Route path={urls.gui.model.error} exact component={ ModelError } />

                        <Route path={urls.gui.transcription.new} component={ NewTranscription } />
                        <Route path={urls.gui.transcription.results + '/:format'} component={ NewTranscriptionResults } />
                    </PageContainer>
                </Router>
            </div>
        );
    }
}



export default App;
