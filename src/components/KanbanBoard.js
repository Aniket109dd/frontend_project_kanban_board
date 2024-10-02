import React from "react";
import KanbanCard from "./KanbanCard";
import KanbanCard_Users from "./KanbanCard_Users"; // Import the new KanbanCard1 component
import todo from "../assets/To-do.svg";
import inprogress from "../assets/in-progress.svg";
import backlog from "../assets/Backlog.svg";
import plus from "../assets/add.svg";
import urgent from "../assets/SVG - Urgent Priority colour.svg";
import high from "../assets/Img - High Priority.svg";
import low from "../assets/Img - Low Priority.svg";
import medium from "../assets/Img - Medium Priority.svg";
import no_priority from "../assets/No-priority.svg";
import threedot from "../assets/3 dot menu.svg";

// Helper function to get initials from the group name
const getInitials = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase(); // If only a first name exists
};

// Color map for special group names
const colorMap = {
    "Anoop sharma": "#FF5733",    // Orange
    "Yogesh": "#33FF57",          // Green
    "Suresh": "#FFC300",          // Yellow
    "Shankar Kumar": "#3357FF",   // Blue
    "Ramesh": "#FF33A8"           // Pink
};

const KanbanBoard = ({ tickets, users, grouping, sortOrder }) => {
    const imgMap = {
        "Todo": todo,
        "In progress": inprogress,
        "Backlog": backlog,
        "Urgent": urgent,
        "High": high,
        "Low": low,
        "Medium": medium,
        "No Priority": no_priority,
    };

    const specialGroupNames = ["Anoop sharma", "Yogesh", "Suresh", "Shankar Kumar", "Ramesh"];

    const sortTickets = (tickets) => {
        if (sortOrder === "priority") {
            return [...tickets].sort((a, b) => b.priority - a.priority);
        } else if (sortOrder === "title") {
            return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
        }
        return tickets;
    };

    const groupByStatus = () => {
        return tickets.reduce((grouped, ticket) => {
            const status = ticket.status;
            if (!grouped[status]) {
                grouped[status] = [];
            }
            grouped[status].push(ticket);
            return grouped;
        }, {});
    };

    const groupByUser = () => {
        return tickets.reduce((grouped, ticket) => {
            const user = users.find(user => user.id === ticket.userId);
            const userName = user ? user.name : "Unassigned";
            if (!grouped[userName]) {
                grouped[userName] = [];
            }
            grouped[userName].push(ticket);
            return grouped;
        }, {});
    };

    const groupByPriority = () => {
        const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];
        return tickets.reduce((grouped, ticket) => {
            const priority = priorityLabels[ticket.priority] || "No Priority";
            if (!grouped[priority]) {
                grouped[priority] = [];
            }
            grouped[priority].push(ticket);
            return grouped;
        }, {});
    };

    const renderGroupedTickets = () => {
        let groupedTickets = {};

        if (grouping === "status") {
            groupedTickets = groupByStatus();
        } else if (grouping === "user") {
            groupedTickets = groupByUser();
        } else if (grouping === "priority") {
            groupedTickets = groupByPriority();
        }

        return Object.entries(groupedTickets).map(([groupName, groupTickets]) => (
            <div key={groupName} className="group">
                <div className="header">
                    <div className="left-section">
                        {/* Conditionally render initials circle for special group names with colors */}
                        {specialGroupNames.includes(groupName) ? (
                            <div
                                className="initials-circle"
                                style={{ backgroundColor: colorMap[groupName] }}  // Apply the color based on the groupName
                            >
                                {getInitials(groupName)}
                            </div>
                        ) : (
                            <img src={imgMap[groupName]} alt={groupName} className="header_img" />
                        )}
                        {/* Display the group name along with the count of cards */}
                        <h3>{groupName} {groupTickets.length}</h3>
                    </div>

                    <div className="right-section">
                        <img src={plus} alt="Add" className="header_img" />
                        <img src={threedot} alt="Menu" className="header_img" />
                    </div>
                </div>
                {sortTickets(groupTickets).map((ticket) => {
                    // Render KanbanCard_Users for special group names, otherwise render KanbanCard
                    return specialGroupNames.includes(groupName) ? (
                        <KanbanCard_Users key={ticket.id} ticket={ticket} user={users.find(u => u.id === ticket.userId)} />
                    ) : (
                        <KanbanCard key={ticket.id} ticket={ticket} user={users.find(u => u.id === ticket.userId)} />
                    );
                })}
            </div>
        ));
    };

    return (
        <div className="kanban-board">
            {renderGroupedTickets()}
        </div>
    );
};

export default KanbanBoard;
