// App.js
import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import GroupingControls from "./components/GroupingControls";
import { fetchTickets } from "./utils/api";
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grouping, setGrouping] = useState('status'); // Default grouping by status
  const [sortOrder, setSortOrder] = useState('priority'); // Default sorting by priority

  useEffect(() => {
    // Fetch data from the API when the app loads
    fetchTickets().then((data) => {
      setTickets(data.tickets || []);
      setUsers(data.users || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="App">
      <GroupingControls
        grouping={grouping}
        sortOrder={sortOrder}
        onGroupingChange={handleGroupingChange}
        onSortOrderChange={handleSortOrderChange}
      />

      <KanbanBoard tickets={tickets} users={users} grouping={grouping} sortOrder={sortOrder} />
    </div>
  );
};

export default App;
