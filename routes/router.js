const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../helper/jwt_helper");

const UserControlloer = require("../Controller/UserController");
const ReceiptController = require("../Controller/ReceiptController");

//user control area
router.post("/api/v1/user/register", UserControlloer.register);
router.post("/api/v1/user/login", UserControlloer.login);
router.get("/api/v1/user/authority", verifyAccessToken, UserControlloer.user);

//receipt control area

//get all receipt of the user
router.get(
  "/api/v1/receipt/getAll",
  verifyAccessToken,
  ReceiptController.getAllReceipt
);

//user post a receipt
router.post(
  "/api/v1/receipt/post",
  verifyAccessToken,
  ReceiptController.postReceipt
);

//user update the receipt
router.post(
  "/api/v1/receipt/update",
  verifyAccessToken,
  ReceiptController.updateReceipt
);

//user delete the receipt
router.post(
  "/api/v1/receipt/delete",
  verifyAccessToken,
  ReceiptController.deleteReceipt
);

module.exports = router;
