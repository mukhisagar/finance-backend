import { app } from "./app";
import { PORT } from "./utils/config";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log("API docs in README.md");
});
