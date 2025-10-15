exports.success = (data) => ({ status: "success", data });
exports.error = (message) => ({ status: "error", message });
