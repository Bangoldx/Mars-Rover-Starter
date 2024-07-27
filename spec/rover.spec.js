const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(12345);
  let response = rover.receiveMessage(message);

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function () {
    expect(rover.position).toBe(12345);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });
  test("response returned by receiveMessage contains the name of the message", function () {
    expect(response.message).toBe("Test message with two commands")
  });
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    expect(response.results.length).toBe(2);
  });
  test("responds correctly to the status check command", function () {
    expect(response.results[1].roverStatus.mode).toBe("LOW_POWER");
    expect(response.results[1].roverStatus.generatorWatts).toBe(110);
    expect(response.results[1].roverStatus.position).toBe(12345);
  });
  test("responds correctly to the mode change command", function () {
    expect(response.results[1].completed).toBe(true);
    expect(response.results[1].roverStatus.mode).toBe("LOW_POWER");
  });
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let moveCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 54321)];
    let message = new Message('Test message with two commands', moveCommands);
    let rover2 = new Rover(12345);
    let moveResponse = rover2.receiveMessage(message);
    expect(expect(moveResponse.results[1].completed).toBe(false));
  });
  test("responds with the position for the move command", function(){
    let moveCommands = [new Command('MOVE', 54321), new Command("STATUS_CHECK")];
    let message = new Message('Test message with two commands', moveCommands);
    let rover2 = new Rover(12345);
    let moveResponse = rover2.receiveMessage(message);
    expect(moveResponse.results[1].roverStatus.position).toBe(54321);
  })
});
