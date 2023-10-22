import { API } from '../utils/confiig';

export const fetchData = async () => {
    try {
        const response = await fetch(`${API}/some-endpoint`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('An error occurred while fetching data.');
    }
};
