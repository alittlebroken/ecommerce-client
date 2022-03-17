import axios from 'axios';

import { BASE_URL, loginUser } from './auth';

jest.mock("axios");

describe('loginUser',  () => {

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

        it('should return a null value', async () => {

            // Setup the mocked error
            const message = "Network Error";
            axios.post.mockRejectedValueOnce(new Error(message));

            // Payload to send with the request
            const payload = {
                email: 'tomdick@harry.com',
                password: 'letmer1in'
            }

            // Send the request
            const result = await loginUser(payload);

            // Test the result that came back from the test
            expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/auth/login`, payload);
            expect(result).toEqual(null);

        });

    });

});