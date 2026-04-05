"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./utils/config");
app_1.app.listen(config_1.PORT, () => {
    console.log(`Server running on port ${config_1.PORT}`);
    console.log(`Health check: http://localhost:${config_1.PORT}/health`);
    console.log("API docs in README.md");
});
//# sourceMappingURL=server.js.map