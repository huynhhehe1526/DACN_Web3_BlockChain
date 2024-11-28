const mongoose = require('mongoose');

const guessBitcoinSchema = new mongoose.Schema({
    bitcoin_wallet: String,
    bank_account: String,
    totalBalance: Number,
    bitcoin: { type: Number, default: 0 },
    predicted_price: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
});

guessBitcoinSchema.index({ bitcoin_wallet: 1, bank_account: 1 }, { unique: true });
const GuessBitcoin = mongoose.model('guessBitcoin', guessBitcoinSchema);
module.exports = GuessBitcoin;
