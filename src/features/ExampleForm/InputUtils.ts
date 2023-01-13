import React from "react";

export type ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

/***
 * A better implementation of this would supply typed input wrappers to track dirty states, touched, clean, and all varieties of event handlers
 * @param dispatch
 */
export function notify<FormState>(
    dispatch: React.Dispatch<Partial<FormState>>,
): ChangeEventHandler {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.name !== undefined) {
            const payload: { [key: string]: any } = {};
            payload[event?.target?.name] = event?.target?.value
            dispatch(payload as Partial<FormState>)
        } else {
            // in a practical example this would be in a wrapper component at init
            throw Error('Name is required in input field.')
        }
    }
}
