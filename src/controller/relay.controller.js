import Relay from "../models/relay.model.js";

async function get_relay_addrs() {
  return await Relay.findAll();
}

async function insert_relay_addr(relay_addr) {
  await Relay.create(relay_addr);
  console.log("Relay inserted successfully");
}

async function delete_relay_addr(relay_addr) {
  const result = await Relay.deleteOne({ address: relay_addr });

  if (result.deletedCount > 0) {
    console.log("Node deleted successfully");
  } else {
    console.log("No node found with that relay_addr");
  }
}

export { get_relay_addrs, insert_relay_addr, delete_relay_addr };
