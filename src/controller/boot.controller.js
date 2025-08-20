import {Nodes} from "../models/node.model.js"

async function get_nodes() {
  return await Nodes.find({});
}

async function insert_nodes(relay_addr) {
  await Nodes.create(relay_addr);
  console.log("Relay inserted successfully");
}


async function delete_nodes(peerIdToDelete) {
  const result = await Nodes.deleteOne({ peer_id: peerIdToDelete });
  return result;
}

export { get_nodes, insert_nodes, delete_nodes };
