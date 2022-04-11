import axios from 'axios';

import { 
    BASE_URL, 
    loginUser, 
    registerUser, 
    getUser,
    updateUser } from './auth';

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

describe('getUser', () => {

    describe('when API call is successful', () => {

        it('should retrieve a users details', async () => {

            // Data we expect the API to return
            const apiResponse = [
                {
                    user_id: 1,
                    email: 'bernie@beelover.co.uk',
                    password: 'dkfja;firgohrrgefgkdfgjdf',
                    forename: 'Bernie',
                    surname: 'Wilkins',
                    join_date: '2019-01-01 13:15:25',
                    last_logon: '2022-04-01 12:15:13',
                    enabled: true,
                    contact_number: '05277 398481',
                    roles: 'Customer'
                }
            ];
            
            axios.get.mockResolvedValueOnce(apiResponse);

            // Payload to send to the function
            const token = '457023485734573475';
            const payload = {
                user_id: 1,
                token
            }

            // Run the command
            const result = await getUser(payload);

            // Test the result matches what we expect
            expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users/${1}?secret_token=${token}`);
            expect(result).toEqual(apiResponse);

        });

    });

    describe('when api call is unsuccessful', () => {

        it('should return an error message', async () => {
           
            const errorMessage = new Error('No records were found with the specified parameters');
            axios.get.mockRejectedValueOnce(errorMessage);

            try {
                // Payload to send to the function
                const payload = {
                    user_id: 1,
                    token: '457023485734573475'
                }

                // Send the request
                await getUser(payload);

            } catch (error) {
                expect(error).toEqual(errorMessage);
            }

        });

    });

});

describe('updateUser', () => {

    describe('when api call is successful', () => {

       it('should update the users details', async () => {

          /**
           * User data to update
           */
          const payload = {
              id: 1,
              token: 'kdfgnadfk84514jnbkg',
              updates: {
                "table_key_col": "user_id",
                data: [
                    { "column": "forename", "value": 'Donald' },
                    { "column": "surname", "value": 'Baston' },
                    { "column": "contact_number", "value": '09345 834031' },
                ] 
            }
          };

          /**
           * The data the function should actuall send to the API
           */
          const apiPayload = {
            "table_key_col": "user_id",
            data: [
                { "column": "forename", "value": 'Donald' },
                { "column": "surname", "value": 'Baston' },
                { "column": "contact_number", "value": '09345 834031' },
            ]
        };

          /**
           * Set the expected data that the API would return and
           * set the mock axios return value
           */
          const apiResponse = {
            state: "SUCCESS",
            status: 200,
            message: `Record 1 updated successfully`
          };
          axios.put.mockResolvedValueOnce(apiResponse);

          /**
           * Make the call to the API
           */
          const response = await updateUser(payload);

          /**
           * Check the response is as expected
           */
           expect(axios.put).toHaveBeenCalledWith(`${BASE_URL}/users/${1}?secret_token=${payload.token}`, apiPayload);
           expect(response).toEqual(apiResponse);

       });

    });

    describe('when api call is unsuccessful', () => {

        it('should return an error message', async () => {
           
            const errorMessage = new Error('unable to update the record');
            axios.get.mockRejectedValueOnce(errorMessage);

            try {
                
                /**
                * User data to update
                */
                const payload = {
                    id: 1,
                    token: 'kdfgnadfk84514jnbkg',
                    updates: {
                    "table_key_col": "user_id",
                    data: [
                        { "column": "forename", "value": 'Donald' },
                        { "column": "surname", "value": 'Baston' },
                        { "column": "contact_number", "value": '09345 834031' },
                        ] 
                    }
                };

                // Send the request
                await updateUser(payload);

            } catch (error) {
                expect(error).toEqual(errorMessage);
            }

        });

    });

});