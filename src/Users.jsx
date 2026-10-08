import React from "react";
import { useSearchParams } from "react-router-dom";

const users = [
  { id: 1, name: "Arun", email: "arun@gmail.com", age: 25, city: "Madurai" },
  { id: 2, name: "Rahul", email: "rahul@gmail.com", age: 26, city: "Chennai" },
  { id: 3, name: "Priya", email: "priya@gmail.com", age: 24, city: "Coimbatore" },
  { id: 4, name: "Karthik", email: "karthik@gmail.com", age: 28, city: "Salem" },
  { id: 5, name: "Divya", email: "divya@gmail.com", age: 23, city: "Trichy" },
  { id: 6, name: "Vijay", email: "vijay@gmail.com", age: 29, city: "Madurai" },
  { id: 7, name: "Sneha", email: "sneha@gmail.com", age: 25, city: "Chennai" },
  { id: 8, name: "Ajay", email: "ajay@gmail.com", age: 27, city: "Bangalore" },
  { id: 9, name: "Meena", email: "meena@gmail.com", age: 24, city: "Salem" },
  { id: 10, name: "Suresh", email: "suresh@gmail.com", age: 30, city: "Coimbatore" },
  { id: 11, name: "Anitha", email: "anitha@gmail.com", age: 26, city: "Madurai" },
  { id: 12, name: "Praveen", email: "praveen@gmail.com", age: 28, city: "Chennai" },
  { id: 13, name: "Deepa", email: "deepa@gmail.com", age: 23, city: "Trichy" },
  { id: 14, name: "Manoj", email: "manoj@gmail.com", age: 31, city: "Bangalore" },
  { id: 15, name: "Nisha", email: "nisha@gmail.com", age: 25, city: "Madurai" },
  { id: 16, name: "Ramesh", email: "ramesh@gmail.com", age: 29, city: "Salem" },
  { id: 17, name: "Keerthi", email: "keerthi@gmail.com", age: 24, city: "Chennai" },
  { id: 18, name: "Dinesh", email: "dinesh@gmail.com", age: 27, city: "Coimbatore" },
  { id: 19, name: "Swetha", email: "swetha@gmail.com", age: 26, city: "Trichy" },
  { id: 20, name: "Gokul", email: "gokul@gmail.com", age: 30, city: "Madurai" }
];

function Users() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = React.useState(pageFromUrl);

  const recordsPerPage = 5;

  const totalPages = Math.ceil(users.length / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;

  const currentUsers = users.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      <p className="subtitle">
        Total Users: {users.length}
      </p>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Users;