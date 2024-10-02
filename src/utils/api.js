// api.js
export const fetchTickets = async () => {
    const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment"; // Example URL

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch tickets");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return { tickets: [], users: [] }; // Fallback in case of error
    }
};
