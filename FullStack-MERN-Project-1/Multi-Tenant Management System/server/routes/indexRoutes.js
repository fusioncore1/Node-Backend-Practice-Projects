// trying to shorten the import export of routers:

// importing external packages/libraries/modules:
import express from 'express';

// importing internal packages/libraries/modules:

// importing the routers:
import invoiceRouter from './invoiceRouter.js';
import organizationRouter from './organizationRouter.js';
import projectRouter from './projectRouter.js';
import userRouter from './userRouter.js';

// creating a router object:
const router = express.Router();

// creating routes:
router.use('/invoice', invoiceRouter);
router.use('/organization', organizationRouter);
router.use('/project', projectRouter);
router.use('/user', userRouter);

// exporting the router object:
export default router;