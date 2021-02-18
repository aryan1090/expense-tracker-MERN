const Transaction = require('../models/Transaction');
//@description Get all transactions
//@route GET /api/v1/transaction
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    }
    catch {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}


//@description Add transactions
//@route POST /api/v1/transaction
exports.addTransactions = async (req, res, next) => {
    try {
        const { text, amount } = req.body;
        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (error) {
        if(error.name === 'ValidationError'){
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success:false,
                error:messages
            })
        }
        else{
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}


//@description Delete transactions
//@route Delete /api/v1/transaction/:id
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction){
            return res.status(404).json({
                success:false,
                error:'No transaction found'
            })
        }
        await transaction.remove();
        return res.status(200).json({
            success:true,
            data:{}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}