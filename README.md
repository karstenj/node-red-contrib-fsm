# A Finite State Machine for node-red
Modelling a FSM in node-red can become very painful. This node offers a simple approach of modelling state based processing of messages in node-red.

[![node-red-contrib-fsm](https://github.com/karstenj/node-red-contrib-fsm/raw/master/doc/node-fsm.png)](https://github.com/karstenj/node-red-contrib-fsm)

## Install
Download the package from GitHub and execute:
```sh
$ cd cd ~/.node-red
$ npm install node-red-contrib-fsm
```

## Changes

  - 0.0.6
    * Added condition state selection in transition configuration
    * Selection of output message (transition, state entry and state exit)
	* Output message topic does not contain FSM event information => moved to payload property

## Description
For each state transition you have to configure the name of the transition, the condition topic, the source state and the destination state. Received messages at the input will trigger a state transition, if the current state of the FSM matches the state in the source column, the msg.topic equals the condition column in the same row and if the msg.payload contains the boolean value 'true'.

In node-red-contrib-fsm you have to configure the following properties:

  - Name
    * Just the name of the FSM node
  - Topic
    * The topic is used for the output message
  - Initial State
    * The state which is entered at startup
  - Initial Transition
    * The name of the initial transition
  - The output message configuration
    * Transition - output message is generated for a state transition. The name which has been entered in the transition name column is returned in the message payload.
    * State Entry - output message is generated for a state entry event. The name which has been entered in the destination name column appended by '_entry' is returned in the message payload.
    * State Exit - output message is generated for a state exit event. The name which has been entered in the source name column appended by '_exit' is returned in the message payload.
  - Transition(s)
    * 'Name' - Name of the transition
    * 'Source' - the source state
    * 'Destination' - the destination state
    * 'Condition' - the condition topic of the input message
    * 'Cond.State' - the state (true or false) of the input payload
	
    
## Example

### Simple pedestrian light with manual trigger
The following example demonstrates the FSM node for a simple pedestrian traffic light state machine. It has two states ST_RED and ST_GREEN, where the related light gets switched on. The ST_RED state is entered at statup. The transitions between the two states are triggered by COND_GREEN and COND_RED repectively.

![FSM](https://github.com/karstenj/node-red-contrib-fsm/raw/master/doc/example-fsm-uml.png)

The flow in node-red:
![FSM](https://github.com/karstenj/node-red-contrib-fsm/raw/master/doc/example-fsm-flow.png)

The switch nodes filter the result message of FSM for the entry event of the states and the change node generates the final action of switching the traffic lights.

The exported flow can be downloaded from here: [FLOW](https://github.com/karstenj/node-red-contrib-fsm/blob/master/doc/example-fsm-flow.json).

The FSM node is configured as shown in the UML state diagram.

![FSM](https://github.com/karstenj/node-red-contrib-fsm/raw/master/doc/example-fsm-config.png)

### UK Traffic Light Simulator 

Thanks to [TotallyInformation](https://github.com/TotallyInformation) for providing this example and feedback on the FSM node.

Note that under UK law, the amber light must
be showing for 3 seconds.

Sequence is:

  - RED
  - RED+AMBER
  - GREEN
  - AMBER
  - RED

In this finite state machine, we only need one condition, called `CHANGE` since we only need to rotate through each state in turn.

In this flow example, we use the transition output to control the sequence and take the entry output as the actual light(s) showing.

![FSM](https://github.com/karstenj/node-red-contrib-fsm/raw/master/doc/example-fsm-uk-traffic-light-flow.png)

The exported flow can be downloaded from here: [FLOW](https://github.com/karstenj/node-red-contrib-fsm/blob/master/doc/example-fsm-uk-traffic-light-flow.json).

## Developers
```sh
$ cd ~/.node-red/node-modules
$ git clone https://github.com/karstenj/node-red-contrib-fsm.git
cd node-red-contrib-fsm
npm install
```

## Discussions and suggestions
There is a google group: <https://groups.google.com/forum/#!forum/node-red-contrib-fsm>

## Further Improvements

  - Support of nested states

