// external packages/modules:
import express from 'express';

// internal packages/modules:
import inventoryRoute from './inventoryRoutes.js';
import productRoute from './productRoutes.js';
import purchaseOrderItemRoute from './purchaseOrderItemRoutes.js';
import purchaseOrderRoute from './purchaseOrderRoutes.js';
import shipmentItemRoute from './shipmentItemRoutes.js';
import shipmentRoute from './shipmentRoutes.js';
import stockMovementRoute from './stockMovementRoutes.js';
import vendorRoute from './vendorRoutes.js';
import warehouseRoute from './warehouseRoutes.js';

// creating router object:
const router = express.Router();

// creating route paths:
router.use('/inventory', inventoryRoute);
router.use('/product', productRoute);
router.use('/purchaseOrderItem', purchaseOrderItemRoute);
router.use('/purchaseOrder', purchaseOrderRoute);
router.use('.shipmentItem', shipmentItemRoute);
router.use('shipment', shipmentRoute);
router.use('stockMovement', stockMovementRoute);
router.use('vendor', vendorRoute);
router.use('warehouse', warehouseRoute);

// exporting router object:
export default router;