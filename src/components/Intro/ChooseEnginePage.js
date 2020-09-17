import React, { useState } from 'react';
import { Segment} from 'semantic-ui-react';
import Branding from 'components/Shared/Branding';
import ChooseEngine from 'components/Engine/ChooseEngine';

const ChooseEnginePage = () => {

    return (
        <>
            <Branding />
            <Segment>
                <ChooseEngine />
            </Segment>
        </>
    )
}

export default ChooseEnginePage
