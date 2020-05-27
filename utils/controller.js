function getManagers() {
    const promise = new Promise((resolve, reject) => {
        let sqlQuery = `SELECT first_name, last_name, id FROM employee_db.employee WHERE manager_id IS NULL;`;
        connection.query(sqlQuery, function (err, managers) {
            if (err) reject(err);
            // for (let name of res) {
            //     managerName.push(res);
            // }
            resolve(managers);
        })
    })
    return promise;
}

function getRoles() {
    const promise = new Promise((resolve, reject) => {
        let sqlQuery = `SELECT id, title FROM employee_db.role;`;
        connection.query(sqlQuery, function (err, roles) {
            if (err) reject(err);
            // for (let name of res) {
            //     managerName.push(res);
            // }
            resolve(roles);
        })
    })
    return promise;
}

function getEmployees() {
    const promise = new Promise((resolve, reject) => {
        let sqlQuery = `SELECT id, first_name, last_name FROM employee;`;
        connection.query(sqlQuery, function (err, employees) {
            if (err) reject(err);
            resolve(employees);
        })
    })
    return promise;
}

async function viewAllEmployees() {
    // const employees = await getEmployees();
    // console.table(employees);
    const promise = new Promise((resolve, reject) => {
        let sqlQuery = "SELECT emp.id AS Employee_ID, emp.first_name, emp.last_name, r.title, r.salary, CONCAT(mgr.first_name , ' ', mgr.last_name) AS Manager, d.name AS Department_Name ";
        sqlQuery += "FROM employee emp ";
        sqlQuery += "LEFT JOIN employee mgr ON emp.manager_id = mgr.id ";
        sqlQuery += "INNER JOIN role r ON emp.role_id = r.id ";
        sqlQuery += "LEFT JOIN department d ON r.department_id = d.id ";
        sqlQuery += "ORDER BY emp.id;";
        connection.query(sqlQuery, function (err, res) {
            if (err) reject(err);
            console.table(res);
            resolve();
        })
    })
    return promise;
}

function viewEmployeesByDepartment() {
    const promise = new Promise((resolve, reject) => {
        let sqlQuery = "SELECT emp.id AS Employee_ID, emp.first_name, emp.last_name, d.name AS Department_Name ";
        sqlQuery += "FROM employee emp ";
        sqlQuery += "INNER JOIN role r ON emp.role_id = r.id ";
        sqlQuery += "LEFT JOIN department d ON r.department_id = d.id ";
        sqlQuery += "ORDER BY emp.id;";
        connection.query(sqlQuery, function (err, res) {
            if (err) reject(err);
            console.table(res);
            resolve();
        })
    })
    return promise;
}
function viewEmployeesByManager() {
    const promise = new Promise((resolve, reject) => {
        let sqlQuery = "SELECT emp.id AS Employee_ID, emp.first_name, emp.last_name, CONCAT(mgr.first_name , ' ', mgr.last_name) AS Manager ";
        sqlQuery += "FROM employee emp ";
        sqlQuery += "LEFT JOIN employee mgr ON emp.manager_id = mgr.id ";
        sqlQuery += "ORDER BY emp.id;";
        connection.query(sqlQuery, function (err, res) {
            if (err) reject(err);
            console.table(res);
            resolve();
        })
    })
    return promise;
}

async function addEmployee() {
    const roles = await getRoles();
    const managers = await getManagers();
    const addEmployeesdata = await inquirer.prompt([
        {
            type: "input",
            message: "What's this employee's first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What's this employee's last name?",
            name: "lastName"
        },
        {
            type: "list",
            message: "What's this employee's role?",
            name: "role",
            choices: roles.map((role) => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
        },
        {
            type: "list",
            message: "Who is this employee's manager?",
            name: "manager",
            choices: managers.map(m => ({ name: `${m.first_name} ${m.last_name}`, value: m.id }))
        }
    ])
    let sqlQuery = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUE ("${addEmployeesdata.firstName}", "${addEmployeesdata.lastName}", ${addEmployeesdata.role}, ${addEmployeesdata.manager});`;
    const promise = new Promise((resolve, reject) => {
        connection.query(sqlQuery, function (err, res) {
            if (err) reject(err);
            console.table(res);
            resolve();
        })
    })
    await Promise.resolve(promise);
    return;
}

async function removeEmployee() {
    const employees = await getEmployees();
    const targetEmployee = await inquirer.prompt(
        [
            {
                type: "list",
                name: "id",
                choices: employees.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }))
            }
        ]
    )
    let sqlQuery = `DELETE FROM employee WHERE id=${targetEmployee.id};`;
    const promise = new Promise((resolve, reject) => {
        connection.query(sqlQuery, function (err, res) {
            if (err) reject(err);
            console.log("Employee deleted successfully.");
            resolve();
        })
    })
    await Promise.resolve(promise);
    return;
}

async function updateEmployeeRole() {
    const employees = await getEmployees();
    const roles = await getRoles();
    const targetEmployee = await inquirer.prompt(
        [
            {
                type: "list",
                name: "id",
                choices: employees.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }))
            },
            {
                type: "list",
                name: "role",
                choices: roles.map(r => ({name:r.title, value: r.id}))
            }
        ]
    )
    let sqlQuery = `UPDATE employee SET role_id=${targetEmployee.role} WHERE id=${targetEmployee.id};`;
    const promise = new Promise((resolve, reject) => {
        connection.query(sqlQuery, function (err, res) {
            if (err) reject(err);
            console.log("Employee deleted successfully.");
            resolve();
        })
    })
    await Promise.resolve(promise);
    return;
}


function viewRoles() {
    let sqlQuery = "SELECT * FROM role;";
    connection.query(sqlQuery, function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
}

async function updateEmployeeManager() {
    const employees = await getEmployees();
    const managers = await getManagers();
    const targetEmployee = await inquirer.prompt(
        [
            {
                type: "list",
                name: "id",
                choices: employees.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }))
            },
            {
                type: "list",
                message: "Who would you like to update their manager to be?",
                name: "manager",
                choices: managers.map(m => ({ name: `${m.first_name} ${m.last_name}`, value: m.id }))
            }
        ]
    )
    let sqlQuery = `UPDATE employee SET manager_id=${targetEmployee.manager} WHERE id=${targetEmployee.id};`;
    const promise = new Promise((resolve, reject) => {
        connection.query(sqlQuery, function (err, res) {
            if (err) reject(err);
            console.log("Manager updated successfully");
            resolve();
        })
    })
    await Promise.resolve(promise);
    return;
}

module.exports = {
    addEmployee, 
    getEmployees,
    getManagers,
    getRoles,
    removeEmployee,
    updateEmployeeRole,
    viewRoles,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    viewAllEmployees,
    updateEmployeeManager,
}