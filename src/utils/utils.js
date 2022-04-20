
/**
 * Converts a date time from postgres to a more 
 * easier to digest format
 */
export const convertDateTime = (dateTime) => {

    /**
     * Create the inital date and time object
     */
    return new Date(dateTime).toLocaleString('uk');

};