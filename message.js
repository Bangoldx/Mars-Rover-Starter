class Message {
   // Write code here!
   constructor(name, commands) {
      this.name = name;
      if (!name) {
         throw Error("Message required.");

      }
      this.commands = commands
      // if (Array.isArray(commands) === false) {
      //    throw Error("Command array required")
      // }
   }
}

// let test = new Message("this is a test", ["Status_check"])
// console.log(test)

module.exports = Message;