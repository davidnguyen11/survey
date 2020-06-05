import express from 'express';
import { db } from '../../db';
import { getEmployees } from './employee/get-employee';
import { getDetailEmployee } from './employee/get-detail-employee';
import { createEmployee } from './employee/create-employee';
import { updateEmployee } from './employee/update-employee';
import { deleteEmployee } from './employee/delete-employee';
import { getPerformances } from './performance/get-list-performance';

const router = express.Router();

// Employee
router.get('/employee', async (req, res, next) => {
  const result = await getEmployees(db);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

router.get('/employee/:employeeId', async (req, res, next) => {
  const result = await getDetailEmployee(db, req.params.employeeId);
  res.send(result);
});

router.post('/employee', async (req, res, next) => {
  const employee = req.body;
  const result = await createEmployee(db, employee);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

router.put('/employee', async (req, res, next) => {
  const employee = req.body;
  const result = await updateEmployee(db, employee);
  if (result.error) {
    res.status(400);
  }
  res.send(result);
});

router.delete('/employee', async (req, res, next) => {
  const employee = req.body;
  const result = await deleteEmployee(db, employee);
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

export { router };
