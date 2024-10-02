import React, { useState } from "react";
import display from "../assets/Display.svg"

const GroupingControls = ({ grouping, sortOrder, onGroupingChange, onSortOrderChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="menu">
            <div className="menu-header" onClick={toggleDropdown}>
                <img src={display} alt="display" className="header_img" />
                <h3 className="menu-label">Display</h3>
                <span className={`arrow ${isOpen ? "up" : "down"}`}></span>
            </div>
            {isOpen && (
                <div className="controls">
                    <div className="control-group">
                        <label htmlFor="groupBy">Group by:</label>
                        <select id="groupBy" value={grouping} onChange={onGroupingChange}>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    <div className="control-group">
                        <label htmlFor="sortOrder">Ordering:</label>
                        <select id="sortOrder" value={sortOrder} onChange={onSortOrderChange}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupingControls;
