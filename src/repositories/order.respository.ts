import db from "../db/pool";

class OrderRepository {
  async getAll() {
    const orders = await db.query(
      "SELECT order_id, order_date, customer_id FROM orders LIMIT 10"
    );
    return orders;
  }
}

export default new OrderRepository();
