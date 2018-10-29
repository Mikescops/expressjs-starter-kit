var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false); // This prevent current mongoose depreciation warning
mongoose.connect('mongodb://localhost/starterkit', {useNewUrlParser: true });