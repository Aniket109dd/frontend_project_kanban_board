import React from "react";

// Helper function to get user initials
const getUserInitials = (name) => {
    const initials = name.split(' ').map((word) => word[0]).join('');
    return initials.toUpperCase();
};

// Function to assign color based on user ID
const getUserColor = (userId) => {
    const colors = {
        "usr-1": "#FF5733", // Red
        "usr-2": "#33FF57", // Green
        "usr-3": "#3357FF", // Blue
        "usr-4": "#FF33A8", // Pink
        "usr-5": "#FFC300", // Yellow
    };
    return colors[userId] || "#ccc"; // Default color if not found
};

const KanbanCard = ({ ticket, user }) => {
    const { title, tag } = ticket;

    // Get user initials and color
    const userInitials = getUserInitials(user.name);
    const userColor = getUserColor(user.id);

    return (
        <div className="kanban-card">
            {/* Initials displayed in the top-right corner */}
            <div className="user-initials" style={{ backgroundColor: userColor }}>
                {userInitials}
            </div>

            <h4>{title}</h4>
            <p>{tag.join(", ")}</p>
            {/* <p>Priority: {priority}</p> */}
        </div>
    );
};

export default KanbanCard;
