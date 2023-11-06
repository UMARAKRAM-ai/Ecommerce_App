import Order from '../models/orderModel.js';

const addOrderItems = async (req, res)=>{
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
 } = req.body;

 if(orderItems && orderItems.length === 0){
    res.status(400).json('No order items');
 }
 else{
    const order = new Order({
        orderItems: orderItems.map((x)=> ({
            ...x,
            product: x._id,
            _id: undefined
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
 }
};

const getMyOrders = async (req, res)=>{
   const orders = await Order.find({user: req.user._id});
   res.status(200).json(orders);
 };

const getOrderById = async (req, res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order){
        res.status(200).json(order);
    }
    else{
        res.status(400),json('order not found');
    }

 };


 const updateOrderToPaid = async (req, res)=>{
    res.send('update Order to paid');
 };

 const updateOrderToDelivered = async (req, res)=>{
    res.send('update order to delivers');
 };


 const getOrders = async (req, res)=>{
    res.send('get all orders');
 };

 export { 
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
 }