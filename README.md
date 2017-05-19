# A Finite State Machine for node-red
Modelling a FSM in node-red can become very painful. This node offers a simple approach of modelling state based processing of messages in node-red.

[![node-red-contrib-fsm](https://github.com/karstenj/node-red-contrib-fsm/raw/master/doc/node-fsm.png)](https://github.com/karstenj/node-red-contrib-fsm)
## Install
Download the package from GitHub and execute:
```sh
$ cd node-red-contrib-fsm
$ npm install .
```
## Description
For each state transition you have to configure the name of the transition, the condition topic, the source state and the destination state. Received messages at the input will trigger a state transition, if the current state of the FSM matches the state in the source column, the msg.topic equals the condition column in the same row and if the msg.payload contains the boolean value 'true'.

In node-red-contrib-fsm you have to configure the following properties:

  - Name
    * Just the name of the FSM node
  - Topic
    * The topic is used for the output message
    * '_transition' is appended for the transition message
    * '_entry' is appended for the target state entry
    * '_exit' is appended for the source state exit
  - Initial State
    * The state which is entered at startup
  - Transition(s)
    * 'Name' - Name of the transition
    * 'Condition' - the condition topic of the input message
    * 'Source' - the source state
    * 'Destination' - the destination state
    
## Example
The following example demonstrates the FSM node for a simple pedestrian traffic light state machine. It has two states ST_RED and ST_GREEN, where the related light gets switched on. The ST_RED state is entered at statup. The transitions between the two states are triggered by COND_GREEN and COND_RED repectively.

![FSM](https://github.com/karstenj/node-red-contrib-fsm/raw/master/doc/example-fsm-uml.png)

The flow in node-red:
![FSM](https://github.com/karstenj/node-red-contrib-fsm/raw/master/doc/example-fsm-flow.png)

The switch nodes filter the result message of FSM for the entry event of the states and the change node generates the final action of switching the traffic lights.

The FSM node is configured as shown in the UML state diagram.

![FSM](https://github.com/karstenj/node-red-contrib-fsm/raw/master/doc/example-fsm-config.png)

## Further Improvements

  - Support of nested states

