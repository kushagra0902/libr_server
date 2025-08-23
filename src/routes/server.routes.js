import { json, Router } from "express";
import {
  get_relay_addrs,
  insert_relay_addr,
  delete_relay_addr,
} from "../controller/relay.controller.js";
import {
  get_mods,
  insert_mods,
  delete_mods,
} from "../controller/mod.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  get_nodes,
  insert_nodes,
  delete_nodes,
} from "../controller/boot.controller.js";

const server_router = Router();

server_router.get("/getrelay", async (req, res) => {
  try {
    const relay_list = await get_relay_addrs();
    res.status(200).json({ relay_list });
  } catch (error) {
    console.error("Error getting relay addr from db:", error);
    res.status(500).json({ message: "Failed to get relay addrs" });
  }
});

server_router.get("/getmod", async (req, res) => {
  try {
    const mod_list = await get_mods();
    res.status(200).json({ mod_list });
  } catch (error) {
    console.error("Error getting relay addr from db:", error);
    res.status(500).json({ message: "Failed to get relay addrs" });
  }
});

server_router.get("/getboot", async (req, res) => {
  try {
    const boot_list = await get_nodes();
    res.status(200).json({ boot_list });
  } catch (error) {
    console.error("Error getting relay addr from db:", error);
    res.status(500).json({ message: "Failed to get relay addrs" });
  }
});

server_router.post("/postboot", authMiddleware, async (req, res) => {
  try {
    const { peer_id, node_id } = req.body;
    await insert_nodes({ peer_id, node_id });
    res.status(200).json({ message: "ok" });
    console.log("successful injection of bootstrap id");
  } catch (error) {
    console.error("Error posting the bootstrap:", error);
  }
});

server_router.post("/postmod", authMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const { peer_id, public_key } = req.body;
    await insert_mods({ peer_id, public_key });
    res.status(200).json({ message: "ok" });
    console.log("successful injection of mod id");
  } catch (error) {
    console.error("Error posting the mod:", error);
  }
});

server_router.post("/postrelay", authMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const { address } = req.body;
    await insert_relay_addr({ address });
    res.status(200).json({ message: "ok" });
    console.log("Successful injection of relay peer id");
  } catch (error) {
    console.error("Error posting the relay:", error);
  }
});

server_router.delete("/deleterelay", authMiddleware, async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res
        .status(400)
        .json({ error: "Address is required in the request body." });
    }
    await delete_relay_addr(address);

    res.status(200).json({ message: "Relay deleted successfully." });
    console.log(`Successful deletion of relay: ${address}`);
  } catch (error) {
    console.error("Error deleting the relay:", error);
    res.status(500).json({ error: "Failed to delete the relay." });
  }
});

server_router.delete("/deletemod", authMiddleware, async (req, res) => {
  try {
    const { peer_id } = req.body;
    if (!peer_id) {
      return res
        .status(400)
        .json({ error: "Peer ID is required in the request body." });
    }

    const result = await delete_mods(peer_id);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Mod with that peer_id not found." });
    }

    res.status(200).json({ message: "Mod deleted successfully." });
    console.log(`Successful deletion of mod: ${peer_id}`);
  } catch (error) {
    console.error("Error deleting the mod:", error);
    res.status(500).json({ error: "Failed to delete the mod." });
  }
});

server_router.delete("/deleteboot", authMiddleware, async (req, res) => {
  try {
    const { peer_id } = req.body;
    if (!peer_id) {
      return res
        .status(400)
        .json({ error: "Peer ID is required in the request body." });
    }

    const result = await delete_nodes(peer_id);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Boot node with that peer_id not found." });
    }

    res.status(200).json({ message: "Boot deleted successfully." });
    console.log(`Successful deletion of boot: ${peer_id}`);
  } catch (error) {
    console.error("Error deleting the boot:", error);
    res.status(500).json({ error: "Failed to delete the boot." });
  }
});

export { server_router };
