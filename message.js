class Message {
   // Write code here!
   constructor(name, commands) {
      this.name = name;
      if (!name) {
         throw Error("Message required.");
      }
      this.commands = commands
   }
}

// let test = new Message("this is a test", ["Status_check"])
// console.log(test)

module.exports = Message;