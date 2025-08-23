import Relay from "../models/relay.model.js";

async function get_relay_addrs() {
  try {
    const relays = await Relay.find({}, { _id: 0, address: 1 }); // only fetch address field
    return {
      relaylist: relays.map((r) => ({ address: r.address })),
    };
  } catch (err) {
    console.error("Error fetching relay addrs:", err);
    throw err;
  }
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
