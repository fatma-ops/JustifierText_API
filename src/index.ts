import { app } from './app';
import { PORT } from './env';


app.listen(PORT, () => console.log(`Running on port ${PORT}`));
