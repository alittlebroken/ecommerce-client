import axios from 'axios';

import { BASE_URL, loginUser, registerUser } from './auth';

jest.mock("axios");

describe('loginUser',  () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('when API call is successful', ()  => {

        it('should return a login token', async () => {

            // Token we expect the API to return
            const mockToken = '35801398457-12857-857-39475';
            axios.post.mockResolvedValueOnce(mockToken);

            // Payload to send to the API
            const payload = {
                email: 'tomdick@harry.com',
                password: 'molarrycurly'
            }

            // Run the command
            const result = await loginUser(payload);

            // Test the result matches what we expect
            expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/auth/login`, payload);
            expect(result).toEqual(mockToken);

        });

    });

    describe('when API call is not successful', () => {

        it('should return an error message', async () => {

            // Setup the mocked error
            const apiFailure = new Error('There was an unspecified error.');
            
            axios.post.mockRejectedValueOnce(apiFailure);

            try {
                // Payload to send with the request
                const payload = {
                    email: 'tomdick@harry.com',
                    password: 'letmer1in'
                }

                // Send the request
                await loginUser(payload);

            } catch (error) {
                expect(error).toEqual(apiFailure);
            }

        });

    });

});

describe('registerUser', () => {

    describe('when API call is successful', () => {

        it('should register a new user and send back a registered user', async () => {

            // Data we expect the API to return
            const apiResponse = {
                status: 201,
                message: 'Signup successful',
                user: {
                    user_id: 1,
                    email: 'tomdick@harry.com',
                    password: 'dkfjqwe;lfkjwelkfrwlek',
                    forename: 'Tom',
                    surname: 'Dick',
                    join_date: '2022-01-01 16:45:37',
                    last_logon: null,
                    enabled: true,
                    contact_number: null,
                    roles: 'Customer'
                }
            }
            axios.post.mockResolvedValueOnce(apiResponse);

            // Payload to send to the API
            const payload = {
                email: 'tomdick@harry.com',
                password: 'molarrycurly'
            }

            // Run the command
            const result = await registerUser(payload);

            // Test the result matches what we expect
            expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/auth/register`, payload);
            expect(result).toEqual(apiResponse);

        });

    });

    describe('when api call is unsuccessful', () => {

        it('should return an error message', async () => {
           
            const errorMessage = new Error('There was an unspecified error.');
            axios.post.mockRejectedValueOnce(errorMessage);

            try {
                // Payload to send with the request
                const payload = {
                    email: 'tomdick@harry.com',
                    password: 'letmer1in'
                }

                // Send the request
                await registerUser(payload);

            } catch (error) {
                expect(error).toEqual(errorMessage);
            }

        });

    });

});