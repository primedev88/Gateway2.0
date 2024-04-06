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
        self.connectedDevices = 0
        self.connected = {}
        self.node_times = [time()] * 8
        self.lora_data = {"devices": []}

    def start(self):
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)
        while True:
            current_time = time()
            for node_id, node_time in enumerate(self.node_times, start=1):
                if current_time - node_time > 5 and self.connected.get(node_id):
                    self.connectedDevices -= 1
                    del self.connected[node_id]
                    self.lora_data["devices"] = [device for device in self.lora_data["devices"] if device["id"] != str(node_id).zfill(2)]

            self.send_data_to_udp()
            sleep(0.5)

    def send_data_to_udp(self):
        json_data = json.dumps(self.lora_data).encode('utf-8')
        sock.sendto(json_data, (UDP_IP, UDP_PORT))

    def on_rx_done(self):
        self.clear_irq_flags(RxDone=1)
        payload = self.read_payload(nocheck=True)
        data = payload.decode("utf-8", 'ignore')
        print("\nReceived:", data)

        node_id = data[:2]
        temp = data[2:7]
        humidity = data[7:12]
        light_intensity = data[12:18]

        print("Node_ID:", node_id, type(node_id))
        print("Temperature:", temp)
        print("Humidity:", humidity)
        print("Light Intensity:", light_intensity)

        existing_device = next((device for device in self.lora_data["devices"] if device["id"] == node_id), None)

        if existing_device:
            # Update existing device data
            existing_device.update({
                "id": node_id,
                "timestamp": str(time()),
                "temperature": temp,
                "humidity": humidity,
                "lightIntensity": light_intensity
            })
        else:
            # Add new device data
            self.lora_data["devices"].append({
                "id": node_id,
                "timestamp": str(time()),
                "temperature": temp,
                "humidity": humidity,
                "lightIntensity": light_intensity
            })

        self.node_times[int(node_id) - 1] = time()

        # Remove disconnected devices
        # Remove disconnected devices
        current_time = time()
        for node_id, node_time in enumerate(self.node_times, start=1):
            if current_time - node_time > 5 and self.connected.get(node_id):
                self.connectedDevices -= 1
                del self.connected[node_id]
                # Remove the device data from lora_data
                for i, device in enumerate(self.lora_data["devices"]):
                    if device["id"] == str(node_id).zfill(2):
                        del self.lora_data["devices"][i]
                        break  # Exit loop after removing the device


        self.set_mode(MODE.SLEEP)
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)



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
