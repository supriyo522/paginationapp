import React, { useState, useEffect } from "react";

const XPagination = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then(data => setEmployees(data))
            .catch(error => {
                setError(error.message);
                alert("Error fetching data: " + error.message);
            });
    }, []);

    const totalPages = Math.ceil(employees.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <h2>Employee Data</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={handlePrevious} disabled={currentPage === 1 ? false : undefined}>Previous</button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={handleNext} disabled={currentPage === totalPages ? false : undefined}>Next</button>
            </div>
        </div>
    );
};

export default XPagination;
