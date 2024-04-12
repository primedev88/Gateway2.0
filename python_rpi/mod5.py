from time import sleep, time
import json
import socket
from SX127x.LoRa import *
from SX127x.board_config import BOARD
from pyrebase import pyrebase

UDP_IP = "127.0.0.54"
UDP_PORT = 8000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
config = {
    "apiKey": "ObjdFhG0sNikafsOsUW370Xw6dQgq0pXmsw0BYLF",
    "authDomain": "mantiswavelora.firebaseapp.com",
    "databaseURL": "https://mantiswavelora-default-rtdb.firebaseio.com",
    "storageBucket": "mantiswavelora.appspot.com"
}
firebase = pyrebase.initialize_app(config)
db = firebase.database()
BOARD.setup()


class LoRaRcvCont(LoRa):

    def __init__(self, verbose=False):
        super(LoRaRcvCont, self).__init__(verbose)
        self.set_mode(MODE.SLEEP)
        self.set_dio_mapping([0] * 6)
        self.lora_data = {"devices": []}
        self.node_timestamps = {}  # Map to store node_id and last update timestamp
        self.node_inactive_count = {}  # Map to store node_id and consecutive inactive count

    def start(self):
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)
        while True:
            self.remove_inactive_nodes()
            self.send_data_to_udp()
            sleep(1)

    def send_data_to_udp(self):
        json_data = json.dumps(self.lora_data).encode('utf-8')
        sock.sendto(json_data, (UDP_IP, UDP_PORT))

    def on_rx_done(self):
        self.clear_irq_flags(RxDone=1)
        payload = self.read_payload(nocheck=True)
        data = bytes(payload).decode("utf-8", 'ignore')
        print("\nReceived:", data)

        # Extract node_id, sanitize and convert to string
        node_id = str(data[:2].strip())  # Trim any leading/trailing whitespaces
        if not node_id.isdigit():
            print("Invalid node_id:", node_id)
            return  # Skip processing invalid node_id

        print("Node_ID:", node_id)
        temp = data[2:7]
        humidity = data[7:12]
        light_intensity = data[12:18]
        receiveTime = time()

        # Update timestamp for the node
        self.node_timestamps[node_id] = receiveTime

        existing_device = next((device for device in self.lora_data["devices"] if device["id"] == node_id), None)

        if existing_device:
            # Update existing device data
            existing_device.update({
                "id": node_id,
                "timestamp": str(receiveTime),
                "temperature": temp,
                "humidity": humidity,
                "lightIntensity": light_intensity
            })
            # Reset inactive count
            self.node_inactive_count[node_id] = 0
        else:
            # Add new device data
            self.lora_data["devices"].append({
                "id": node_id,
                "timestamp": str(receiveTime),
                "temperature": temp,
                "humidity": humidity,
                "lightIntensity": light_intensity
            })
            # Initialize inactive count
            self.node_inactive_count[node_id] = 0

        self.set_mode(MODE.SLEEP)
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)

    def remove_inactive_nodes(self):
        current_time = time()
        for node_id, timestamp in self.node_timestamps.items():
            if current_time - timestamp > 5:
                self.node_inactive_count[node_id] += 1
                if self.node_inactive_count[node_id] > 5:
                    self.remove_node_data(node_id)
            else:
                self.node_inactive_count[node_id] = 0

    def remove_node_data(self, node_id):
        self.lora_data["devices"] = [device for device in self.lora_data["devices"] if device["id"] != node_id]
        del self.node_timestamps[node_id]
        del self.node_inactive_count[node_id]



# Rest of the code remains the same


lora = LoRaRcvCont(verbose=False)
lora.set_mode(MODE.STDBY)
lora.set_pa_config(pa_select=1)

try:
    lora.start()
except KeyboardInterrupt:
    print("\nKeyboardInterrupt")
finally:
    lora.set_mode(MODE.SLEEP)
    BOARD.teardown()
