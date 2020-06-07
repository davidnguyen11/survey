import express from 'express';
import { db } from '../../db';
import { getEmployees } from './employee/get-employee';
import { getDetailEmployee } from './employee/get-detail-employee';
import { createEmployee } from './employee/create-employee';
import { updateEmployee } from './employee/update-employee';
import { deleteEmployee } from './employee/delete-employee';
import { getPerformances } from './performance/get-list-performance';
import { getEmployeePerformances } from './performance/get-employee-list-performance';
import { getEmployeeReviewees } from './employee/get-employee-reviewees';
import { addPerformance } from './performance/add-performance';
import { login } from './account/login';

const router = express.Router();

// Get list of employee informations
router.get('/employee', async (req, res, next) => {
  const result = await getEmployees(db);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

// Get information of specific employee
router.get('/employee/:employeeId', async (req, res, next) => {
  const result = await getDetailEmployee(db, req.params.employeeId);
  res.send(result);
});

// Create new employee
router.post('/employee', async (req, res, next) => {
  const employee = req.body;
  const result = await createEmployee(db, employee);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

// Update employee information
router.put('/employee', async (req, res, next) => {
  const employee = req.body;
  const result = await updateEmployee(db, employee);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

// Delete employee by update status of employee from True to False
router.delete('/employee', async (req, res, next) => {
  const employee = req.body;
  const result = await deleteEmployee(db, employee);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

// Get list of performance reivews of specific employee
router.get('/employee/:employeeId/performances', async (req, res, next) => {
  const result = await getEmployeePerformances(db, req.params.employeeId);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

// Get list of reviewee of specific employee
router.get('/employee/:employeeId/reviewees', async (req, res, next) => {
  const result = await getEmployeeReviewees(db, req.params.employeeId);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

// Performance
router.get('/performance', async (req, res, next) => {
  const result = await getPerformances(db);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

router.post('/performance', async (req, res, next) => {
  const args = req.body;
  const result = await addPerformance(db, args);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

// Acount
router.post('/login', async (req, res, next) => {
  const args = req.body;
  const result = await login(db, args);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

export { router };
