import { IMessage } from '../types';

export function addmessage(message: IMessage) {
    return {
        type: 'ADD_MESSAGE',
        message
    };
}
export function removemessage(id: string) {
    return {
        type: 'REMOVE_MESSAGE',
        id
    };
}
export function fadeoutmessage(id: string) {
    return {
        type: 'FADEOUT_MESSAGE',
        id
    };
}