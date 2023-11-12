const { app } = require('./app');
const { PORT } = require('./env');


app.listen(PORT, () => console.log(`Running on port ${PORT}`));
