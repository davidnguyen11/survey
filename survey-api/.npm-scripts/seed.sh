#!/bin/bash

echo "Filling data to employee table"
node ./scripts/seed/employee/index.js

echo "Filling data to performance table"
node ./scripts/seed/performance/index.js
