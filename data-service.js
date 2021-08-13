const Sequelize = require('sequelize');

var sequelize = new Sequelize('d59tpmbp9668gv', 'ccfnmplyrohcpy', '16d6136920fe2b53d7414602301356009a79f146a78224010a2775f7195adacd', {
    host: 'ec2-52-72-125-94.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    }
});

var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    hireDate: Sequelize.STRING
});

var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});

Department.hasMany(Employee, { foreignKey: 'department' });



module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        sequelize.sync()
            .then(() => {
                resolve();
            })
            .catch(() => {
                reject("unable to sync the database");
            });
    });
}


module.exports.getAllEmployees = function () {
    return new Promise(function (resolve, reject) {
        Employee.findAll()
            .then((data) => {
                resolve(data.map(value => value.dataValues));
            })
            .catch((err) => {
                reject("no results returned");
            });
    });
}

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({ where: { status: status } })
            .then((data) => {
                resolve(data.map(value => value.dataValues));
            })
            .catch((err) => {
                reject("no results returned");
            });
    });
}

module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({ where: { department: department } })
            .then((data) => {
                resolve(data.map(value => value.dataValues));
            })
            .catch((err) => {
                reject("no results returned");
            });
    });
}

module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({ where: { employeeManagerNum: manager } })
            .then((data) => {
                resolve(data.map(value => value.dataValues));
            })
            .catch((err) => {
                reject("no results returned");
            });
    });
}

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({ where: { employeeNum: num } })
            .then((data) => {
                resolve(data[0].dataValues);
            })
            .catch((err) => {
                reject("no results returned");
            });
    });
}

module.exports.getDepartments = function () {
    return new Promise(function (resolve, reject) {
        Department.findAll()
            .then((data) => {
                resolve(data.map(value => value.dataValues));
            })
            .catch((err) => {
                reject("no results returned");
            });
    });
}

module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        for (const prop in employeeData) {
            if (employeeData[prop] == "")
                employeeData[prop] = null;
        }

        Employee.create(employeeData)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject("unable to create employee");
            })
    });
}

module.exports.updateEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        for (const prop in employeeData) {
            if (employeeData[prop] == "")
                employeeData[prop] = null;
        }

        Employee.update(employeeData, {
            where: { employeeNum: employeeData.employeeNum }
        })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject("unable to update employee");
            })
    });
}

module.exports.deleteEmployeeByNum = function (empNum) {
    return new Promise(function (resolve, reject) {
        Employee.destroy({
            where: { employeeNum: empNum }
        })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject("unable to delete employee");
            })
    });
}

module.exports.addDepartment = function (departmentData) {
    return new Promise(function (resolve, reject) {
        for (const prop in departmentData) {
            if (departmentData[prop] == "")
                departmentData[prop] = null;
        }

        Department.create(departmentData)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject("unable to create department");
            })
    });
}

module.exports.updateDepartment = function (departmentData) {
    return new Promise(function (resolve, reject) {
        for (const prop in departmentData) {
            if (departmentData[prop] == "")
                departmentData[prop] = null;
        }
        Department.update(departmentData, {
            where: { departmentId: departmentData.departmentId }
        })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject("unable to update department");
            })
    });
}

module.exports.getDepartmentById = function (id) {
    return new Promise(function (resolve, reject) {
        Department.findAll({ where: { departmentId: id } })
            .then((data) => {
                resolve(data[0].dataValues);
            })
            .catch((err) => {
                reject("no results returned");
            });
    });
}

module.exports.deleteDepartmentById = function (id) {
    return new Promise(function (resolve, reject) {
        Department.destroy({
            where: { departmentId: id }
        })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject("unable to delete department");
            })
    });
}