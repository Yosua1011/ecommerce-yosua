const Transaction = require('../models/Transaction')

const addTransaction = (req, res) => {
    Transaction.create({
        customer: req.headers.username,
        product: req.body.product,
        totalprice: req.body.totalprice
    })
    .then((transactionData) => {
        res.send(transactionData)
    })
    .catch(err => res.send(err))
}

const getAllTransaction = (req, res) => {
    Transaction.find()
    .populate({path: 'customer', models: 'user', select: 'username'})
    .populate({path: 'product', models: 'product', select: 'product'})
    .then(transactionData => res.send(transactionData))
    .catch(err => res.send(err))
}

const getSpesificTransaction = (req, res) => {
    Transaction.findOne({
        customer: req.headers.username
    })
    .populate({path: 'customer', models: 'user', select: 'username'})
    .populate({path: 'product', models: 'product', select: 'product'})
    .then(transactionData => res.send(transactionData))
    .catch(err => res.send(err))
}

const removeOneTransaction = (req, res) => {
    Transaction.remove({
        _id: req.params.id
    })
    .then(notification => {
        res.send('Data transaksi sudah terhapus')
    })
    .catch(err => res.send(err))
}

module.exports = {
    addTransaction,
    getAllTransaction,
    getSpesificTransaction,
    removeOneTransaction
}
