import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react';
import App from '../../App';
import { fetchUsers } from '../api';

import axios from 'axios';

jest.mock('../api');
jest.mock('axios');

let mockUsers = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
];

describe('App', () => {
  beforeEach(() => {
    fetchUsers.mockResolvedValue(mockUsers);
  });

  it('renders user list from API and adds new users', async () => {
    let container;

    await act(async () => {
      container = render(<App />);
    });

    mockUsers.forEach(user => {
      expect(container.getByText(user.name)).toBeInTheDocument();
    });

    const newUsers = [
      { id: 3, name: 'Bob' },
      { id: 4, name: 'Emma' },
    ];

    mockUsers = [...mockUsers, ...newUsers];
    fetchUsers.mockResolvedValue(mockUsers);

    await act(async () => {
      const addButton = container.getByText('Add User');
      fireEvent.click(addButton);
    });

    await act(async () => {
        container = render(<App />);
      });

    newUsers.forEach(user => {
      expect(container.getByText(user.name)).toBeInTheDocument();
    });


    await expect(fetchUsers()).resolves.toEqual(mockUsers);

  });

  it('renders with initial empty state', () => {
    const { container } = render(<App />);
    expect(container.querySelector('ul').children.length).toBe(0);
  });

  it('adds multiple users correctly', async () => {
    
    render(<App />);

    const addButton = screen.getByText('Add User');
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });

  it('Should return a list of users', async () => {
    const users = await fetchUsers();
    expect(users).toHaveLength(4);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
  });

});
