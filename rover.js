class Rover {
   // Write code here!
   constructor(position, mode = "NORMAL", generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }

   receiveMessage(message) {
      let results = [];
      this.message = message.name;
      this.results = results;
      this.completed = true;
      this.roverStatus = {
         mode: this.mode,
         generatorWatts: this.generatorWatts,
         position: this.position
      }

      for (let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === "STATUS_CHECK") {
            results.push({ completed: this.completed, roverStatus: this.roverStatus });
         } else if (message.commands[i].commandType === "MODE_CHANGE") {
            this.roverStatus.mode = message.commands[i].value;
            results.push({ completed: this.completed });
         } else if (message.commands[i].commandType === "MOVE" && this.roverStatus.mode === "LOW_POWER") {
            this.roverStatus.mode === "LOW_POWER";
            this.completed = false;
            results.push({ completed: this.completed });
         } else if (message.commands[i].commandType === "MOVE" && this.roverStatus.mode !== "LOW_POWER") {
            this.roverStatus.position = message.commands[i].value;
            results.push({ completed: this.completed });
         };
      }

      return {
         message: this.message,
         results: this.results
      }
   };
}

module.exports = Rover;