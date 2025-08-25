import { Nodes } from "../models/node.model.js";

async function get_nodes() {
  return await Nodes.find({});
}

async function insert_nodes({ peer_id, node_id }) {
  try {
    const node = await Nodes.findOneAndUpdate(
      { node_id },
      { peer_id, node_id },
      { upsert: true, new: true }
    );
    console.log("Node inserted or updated successfully:", node);
    return node; // optional: return the document
  } catch (err) {
    console.error("Error inserting/updating node:", err);
    throw err;
  }
}

async function delete_nodes(peerIdToDelete) {
  const result = await Nodes.deleteOne({ peer_id: peerIdToDelete });
  return result;
}

export { get_nodes, insert_nodes, delete_nodes };
