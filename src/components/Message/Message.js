import React from 'react';
import { useDispatch } from 'react-redux';
import { removeMessage } from '../../slices/Messages/messagesSlice';
import './Message.css';

const Message = (props) => {

    /**
     * Extract the relevant props
     */
    const { data } = props;
    
    /**
     * Alias the hooks
     */
    const dispatch = useDispatch();

    /**
     * Handle the click of the div
     */
    const handleClick = (payload) => {
        dispatch(removeMessage(payload));
    };
    
    return (
        <div 
        role="presentation"
        className={`message-card ${data.style}`}
        onClick={() => { handleClick(data.id) } }>
            
            <span>
                {data.content ? data.content : null}
            </span>

        </div>
    )
};

export default Message;