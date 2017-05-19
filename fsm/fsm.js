/**
 * Copyright Karsten Juschus
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";
    function FSMNode(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        this.topic = n.topic;
        this.initstate = n.initstate;
        this.state = 'unknown';
        this.rules = n.rules;

        var node = this;
		//node.warn("Rules: "+this.rules.length);
		//node.warn("State: "+this.state);

		setTimeout( function() { node.emit("input",{}); }, 100 );

        // respond to inputs....
        this.on('input', function (msg) {
			if (msg.payload == null) {
				//node.warn("Init");
				var outMsg = {};
				node.state = node.initstate;
				outMsg.topic = this.topic + '_transition';
				outMsg.payload = "init"
				this.send(outMsg);
				outMsg.topic = this.topic + '_entry';
				outMsg.payload = this.state;
				this.send(outMsg);
				node.status({fill:"green",shape:"dot",text:node.state});
			} else {
				//node.warn("Condition topic: "+msg.topic);
				//node.warn("Condition payload: "+msg.payload);
				if (typeof msg.payload === "boolean" && msg.payload) {
					var found = false;
					for (var i = 0; i < node.rules.length; i++) {
						//node.warn("rule.s: "+node.rules[i].s);
						//node.warn("rule.c: "+node.rules[i].c);
						if (node.rules[i].s == node.state && node.rules[i].c == msg.topic) {
							node.status({fill:"green",shape:"dot",text:node.rules[i].s+" => "+node.rules[i].d});
							node.state = node.rules[i].d;
							var outMsg = {};
							outMsg.topic = node.topic + '_exit';
							outMsg.payload = node.rules[i].s;
							node.send(outMsg);
							outMsg.topic = node.topic + '_transition';
							outMsg.payload = node.rules[i].n;
							node.send(outMsg);
							outMsg.topic = node.topic + '_entry';
							outMsg.payload = node.rules[i].d;
							node.send(outMsg);
							found = true;
							break;
						}
					}
					if (!found) {
						node.status({fill:"gray",shape:"ring",text:"Act: "+node.state+" - NoTr: " + msg.topic});
					}
				} else {
					node.status({fill:"green",shape:"dot",text:node.state});
				}
			}
        });

        this.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: node.client.disconnect();
        });
    }

    RED.nodes.registerType("FSM", FSMNode);

}
