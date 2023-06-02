const Order = require('../schemas/orderSchema')
const Status = require('../schemas/statusSchema')
const { adminId } = require('../authentication/admin');

//GET ALL ORDERS NEW
exports.getOrders = async (req, res) => {
  try {
    let query = {};  //defines query as empty object

    if (req.userData._id !== adminId) {    //if the users Id isn't equal adminId
      query.user = req.userData._id;       //updates query object to include the userId filter
    }

    const order = await Order.find(query)
      .populate({ path: 'orderRows.product', model: 'Product' })
      .populate('status', 'status -_id')    //populates only status inside of status
      .exec();

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong when fetching the orders',
      err: err.message
    });
  }
}
// GET ONE ORDER
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;  // Retrieve the order ID from the request parameters

    let query = { _id: orderId };  // Define the query to find the order by its ID

    if (req.userData._id !== adminId) {   // If the user's ID isn't equal to adminId
      query.user = req.userData._id;      // Update the query to include the userId filter
    }

    const order = await Order.findOne(query)  // Find the order using the updated query
      .populate({ path: 'orderRows.product', model: 'Product' })
      .populate('status', 'status -_id')
      .exec();

    if (!order) {  // Check if the order is not found
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong when fetching the order',
      error: err.message
    });
  }
};
// CREATE NEW ORDER
exports.createNewOrder = async (req, res) => {
  const { orderRows } = req.body;

  if (!orderRows) {
    return res.status(400).json({
      message: 'You need to enter orderRows'
    })
  }
  try {
    const order = await Order.create({
      orderRows,
      user: req.userData._id
    })
    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong when creating the order',
      err: err.message
    })
  }
}
// UPDATE ORDER STATUS
exports.updateOrderStatus = (req, res) => {
  const { status } = req.body;
  if (!status) {
    res.status(400).json({
      message: 'You need to enter a new status!'
    })
    return
  }
  if (status !== 1 && status !== 2 && status !== 3) {
    res.status(400).json({
      message: 'You need to enter a valid status!'
    })
    return
  }
  Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: 'That id does not correspond to any existing order.'
        })
        return
      }
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went very, very wrong when updating order status.',
        err: err.message
      })
    })
}