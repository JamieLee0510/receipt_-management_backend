const pool = require("../model/db");
// const createError = require("http-errors");

module.exports = {
  //Get all receipts
  getAllReceipt: async (req, res) => {
    console.log("now wana get all receipt");
    const user_id = req.payload.userID;
    const all_receipt = await pool.query(
      "SELECT * FROM receipt WHERE user_id=($1)",
      [user_id]
    );
    const all_receipt_data = all_receipt.rows;

    return res.send({ success: true, result: all_receipt_data });
  },

  //Post receipt
  postReceipt: async (req, res) => {
    try {
      const req_data = req.body;
      const user_id = req.payload.userID;
      const purchase_item_str = JSON.stringify(req_data.purchase_item);
      const isMatch = await pool.query(
        "SELECT * FROM receipt WHERE receipt_id=($1) AND user_id=($2)",
        [req_data.receipt_id, user_id]
      );
      if (isMatch.rows.length !== 0) {
        return res({ message: "有出現過相似的流水號", data: isMatch.rows });
      }

      const new_receipt = await pool.query(
        "INSERT INTO receipt (receipt_id, store, datetime, tag, user_id, discount,  purchase_item, totalcost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          req_data.receipt_id,
          req_data.store,
          req_data.datetime,
          req_data.tag,
          req.payload.userID,
          req_data.discount,
          purchase_item_str,
          req_data.totalcost,
        ]
      );
      return res.json(new_receipt.rows[0]);
    } catch (err) {
      console.log(err.message);
      return res.send({ message: "fail" });
    }
  },

  //Update Receipt
  updateReceipt: async (req, res) => {
    try {
      const data_id = req.body.id;
      const user_id = req.payload.userID;
      const req_data = req.body;
      const isMatch = await pool.query(
        "SELECT * FROM receipt WHERE id=($1) AND user_id=($2)",
        [data_id, user_id]
      );
      if (isMatch.rows.length === 0) {
        return res.send({ status: "fail", message: "建議再次確認帳號密碼" });
      }
      const purchase_item_str = JSON.stringify(req_data.purchase_item);
      const updated_receipt = await pool.query(
        "UPDATE receipt SET (receipt_id, store, datetime, tag, user_id, discount,  purchase_item, totalcost)=($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          req_data.receipt_id,
          req_data.store,
          req_data.datetime,
          req_data.tag,
          user_id,
          req_data.discount,
          purchase_item_str,
          req_data.totalcost,
        ]
      );
      return res.send({ statue: "success", result: updated_receipt });
    } catch (err) {
      console.log(err.message);
      return res.send({ status: "fail", message: err.message });
    }
  },

  //Delete receipt
  deleteReceipt: async (req, res) => {
    try {
      const data_id = req.body.data_id;
      const user_id = req.payload.userID;
      const isMatch = await pool.query(
        "SELECT * FROM receipt WHERE id=($1) AND user_id=($2)",
        [data_id, user_id]
      );
      if (isMatch.rows.length === 0) {
        return res.send({ status: "fail", message: "建議再次確認帳號密碼" });
      }
      const delete_receipt = await pool.query(
        "DELETE FROM receipt WHERE id=($1)",
        [data_id]
      );
      return res.send({
        status: "delete successfully",
      });
    } catch (err) {
      console.log(err.message);
      return res.send({ status: "fail", message: err.message });
    }
  },
};
