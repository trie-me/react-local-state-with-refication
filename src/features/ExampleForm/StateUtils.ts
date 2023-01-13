import {Dispatch} from "react";

function getStateKey(stateKey: string) {
    return `__state__${stateKey}`;
}

export function commitState<StateType>(value: StateType, stateKey: string) {
    const ser = JSON.stringify((value));
    window?.localStorage?.setItem(
        getStateKey(stateKey),
        ser
    );
    const targetDumpEle = document?.getElementById('target')
    if(targetDumpEle) targetDumpEle.innerText = ser;
    return value;
}

function retrieveState<StateType>(stateKey: string, _default?: StateType) {
    const state = window?.localStorage?.getItem(getStateKey(stateKey));
    if (state) {
        return JSON.parse(state) as StateType;
    }
    return _default;
}

export function tryReifyState<StateType>(dispatch: Dispatch<StateType>, state?: StateType, defaultState?: StateType) {
    return () => {
        const resolvedState = retrieveState<StateType>('FOO_STATE');
        const [
            stateIsDefault,
            resolvedStateExists,
            resolvedStateNotDefault
        ] = [state === defaultState, resolvedState !== undefined, resolvedState !== defaultState];
        if (stateIsDefault && resolvedStateExists && resolvedStateNotDefault) {
            dispatch(resolvedState as StateType)
        }
    }
}
