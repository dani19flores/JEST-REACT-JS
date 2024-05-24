import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import UserList from '../userList';

jest.mock('axios');

const mockedAxios = axios;

    const mockUsers = [
        { id: 1, name: 'Bret' },
        { id: 2, name: 'Ervin Howell' },
    ];

    test('renders user list correctly', async () => {
    // Mock axios.get to return mockUsers
    mockedAxios.get.mockResolvedValue({ data: mockUsers });

    render(<UserList />);

    // Wait for the component to finish loading
    await waitFor(() => {
        expect(screen.getByText('User List')).toBeInTheDocument();
        //expect(screen.getByText('Bret')).toBeInTheDocument();
        //expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    });
    });

    test('handles API error', async () => {
    // Mock axios.get to throw an error
    mockedAxios.get.mockRejectedValue(new Error('Failed to fetch'));

    render(<UserList />);

    // Wait for the component to handle the error
    await waitFor(() => {
        expect(screen.getByText('Error fetching users:')).toBeInTheDocument();
    });
});
