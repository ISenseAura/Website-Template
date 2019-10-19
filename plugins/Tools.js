const fs = require("fs");

var Tools = {
  data: [],
  users: [],

  importDatabase: function(roomid) {
    let file = "{}";
    try {
      file = fs.readFileSync("./databases/" + roomid + ".json").toString();
    } catch (e) {
      console.log(e.message);
    }
    this.data[roomid] = JSON.parse(file);
  },

  importDatabases: function() {
    let databases = fs.readdirSync("./databases");
    for (let i = 0, len = databases.length; i < len; i++) {
      let file = databases[i];
      if (!file.endsWith(".json")) continue;
      this.importDatabase(file.substr(0, file.indexOf(".json")));
    }
  },

  exportDatabase: function(name) {
    if (!(name in this.data)) return;
    fs.writeFileSync(
      "./databases/" + name + ".json",
      JSON.stringify(this.data[name])
        .split("},")
        .join("},\n")
    );
  },

  toId: function(str) {
    return str.replace(/[^A-Z0-9]/gi, "").toLowerCase();
  }
};

module.exports = Tools;
