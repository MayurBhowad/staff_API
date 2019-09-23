const express = require('express');

const app = express();
const employeeRoute = express.Router();

let employeeModel = require('../Model/employee');

// GET
employeeRoute.route('/').get((req, res) => {
    employeeModel.find((err, employee) => {
        if (err) {
            console.log(err);
        } else {
            res.json(employee)
        }
    });
});

// NEW ACCOUNT
employeeRoute.route('/addEmployee').post((req, res) => {
    let employee = new employeeModel(req.body);
    employee.save().then(detail => {
        res.status(200).json({ 'employee': 'Employee added successfully' });
    }).catch(err => {
        res.status(400).send('Something went Wrong...');
    });
});

// GET BY ID
employeeRoute.route('/editEmployee/:id').get((req, res) => {
    let id = req.params.id;
    employeeModel.findById(id, (err, employee) => {
        res.json(employee);
    });
});

// UPDATING EMPLOYEE DETAILS
employeeRoute.route('/updateEmployee/:id').post((req, res) => {
    employeeModel.findById(req.params.id, (err, employee) => {
        if (!employee) {
            return next(new error('Unable to find Employee with this ID'));
        } else {
            employee.firstName = req.body.firstName;
            employee.lastName = req.body.lastName;
            employee.email = req.body.email;
            employee.phone = req.body.phone;

            employee.save().then(emp => {
                res.json('Employee details updated!');
            }).catch(err => {
                res.status(400).send('Try again later');
            });
        }
    });
});

// DELETE
employeeRoute.route('/deleteEmployee/:id').get((req, res) => {
    employeeModel.findByIdAndDelete({ _id: req.params.id }, (err, employee) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Details deleted!');
        }
    });
});

module.exports = employeeRoute;