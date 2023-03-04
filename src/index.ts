import { app } from "./app";

const port = process.env.PORT || 3003;

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});
