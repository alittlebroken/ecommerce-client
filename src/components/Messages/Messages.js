import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Messages.css';

import { 
    selectMessages,
    removeMessage
} from '../../slices/Messages/messagesSlice';

import Message from '../Message/Message';

const Messages = () => {

    /**
     * Get the required state from the store
     */
    const messages = useSelector(selectMessages);

    return (
        <div 
        className={`message-container`} 
        role="presentation">

            {
                messages.messages.map(message => {
                    return <Message key={message.id} data={message} />;
                })
            }

        </div>
    )

};

export default Messages;