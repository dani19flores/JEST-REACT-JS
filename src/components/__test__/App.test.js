import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { fetchUsers } from '../api';

jest.mock('../api');

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
      userEvent.click(addButton);
    });

    await act(async () => {
        container = render(<App />);
      });

    newUsers.forEach(user => {
      expect(container.getByText(user.name)).toBeInTheDocument();
    });
  });
});
