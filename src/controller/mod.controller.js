import { Mods } from "../models/mod.model.js";

async function get_mods() {
  return await Mods.find();
}

async function insert_mods({ peer_id, public_key }) {
  let existingMod = await Mods.findOne({ public_key });

  if (existingMod) {
    existingMod.peer_id = peer_id;
    await existingMod.save();
    console.log("Mod updated successfully");
  } else {
    await Mods.create({ peer_id, public_key });
    console.log("Mod inserted successfully");
  }
}

// async function delete_mods(relay_addr) {
//   const mod = await Mods.findOne({ where: { relay_addr } });
//   if (mod) {
//     await mod.deleteOne();
//     console.log("Mod deleted successfully");
//   } else {
//     console.log("No Mod found to delete");
//   }
// }

async function delete_mods(peerIdToDelete) {
  const result = await Mods.deleteOne({ peer_id: peerIdToDelete });
  return result;
}

export { get_mods, insert_mods, delete_mods };
