export async function fetchUsers(fetchFunction) {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetchFunction(url);
    const data = await response.json();
    return data;
}
