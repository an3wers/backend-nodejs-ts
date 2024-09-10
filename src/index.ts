import { app } from "./app";
import { startMongoDB } from "./db/mongodb";

const port = process.env.PORT || 3003;

const startApp = async () => {
  try {
    await startMongoDB();

    app.listen(port, function () {
      console.log(`App listening on port ${port}!`);
    });
  } catch (error) {
    console.error("[Start App]: ", error);
  }
};

startApp();
