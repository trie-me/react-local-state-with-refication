import React, {useEffect, useReducer} from "react";
import {commitState, tryReifyState} from "./StateUtils";
import {ExampleFormInputState, ExampleFormInputNames} from "./Abstractions";
import {ChangeEventHandler, notify} from "./InputUtils";


const DEFAULT_STATE = {};

function usePersistedState<StateType>(defaultState: StateType): [StateType, ChangeEventHandler] {
    const [state, dispatch] = useReducer(
        (acc: StateType, val: Partial<StateType>) => commitState({...acc, ...val}, 'FOO_STATE'),
        defaultState
    );
    useEffect(tryReifyState(dispatch, state, defaultState));
    return [state, notify(dispatch)];
}

export function ExampleForm() {
    const [state, updater] = usePersistedState<ExampleFormInputState>(DEFAULT_STATE);
    return <div>
        <form id='form'>
            <input type='text' name={ExampleFormInputNames.Name} value={state.name || ''} onChange={updater}/><br/>
            <label htmlFor={ExampleFormInputNames.Name}>Name</label><br/>
            <input type='text' name={ExampleFormInputNames.Age} value={state.age || ''} onChange={updater}/><br/>
            <label htmlFor={ExampleFormInputNames.Age}>Age</label><br/>
            <input type='text' name={ExampleFormInputNames.Color} value={state.color || ''} onChange={updater}/><br/>
            <label htmlFor={ExampleFormInputNames.Color}>Color</label><br/>
        </form>
    </div>
}
