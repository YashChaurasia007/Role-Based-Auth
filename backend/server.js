const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./Controller/auth.js');
const dashboardRouter = require('./Controller/dashboard.js');
const approval_role_router = require('./Controller/approval_role.js');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Mount auth and dashboard routers
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/api/approval_for_role', approval_role_router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});