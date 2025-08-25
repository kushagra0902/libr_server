import { Nodes } from "../models/node.model.js";

async function get_nodes() {
  return await Nodes.find({});
}

async function insert_nodes({ peer_id, node_id }) {
  const existingNode = await Nodes.findOne({ where: { node_id } });

  if (existingNode) {
    await existingNode.update({ peer_id });
    //await existingNode.save();
    console.log("boot updated successfully");
  } else {
    await Nodes.create({ peer_id, node_id });
    console.log("bootinserted successfully");
  }
}

async function delete_nodes(peerIdToDelete) {
  const result = await Nodes.deleteOne({ peer_id: peerIdToDelete });
  return result;
}

export { get_nodes, insert_nodes, delete_nodes };
