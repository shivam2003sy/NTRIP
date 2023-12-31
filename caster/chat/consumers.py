import json,logging
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

# from chat.utils import validate_mount_point

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


log_file_handler = logging.FileHandler('communication.log')
log_formatter = logging.Formatter('%(asctime)s [%(levelname)s] - %(message)s')
log_file_handler.setFormatter(log_formatter)
logger.addHandler(log_file_handler)       
class ServerConnection(WebsocketConsumer):
    def connect(self):
        print(self.scope)
        logger.warning("Establishing Connetion .......")
        self.room_group_name = self.scope['url_route']['kwargs']['room_name']
        logger.info("Connection established for volume %s", self.room_group_name)
        # self.mount_point = self.scope['url_route']['kwargs']['mount_point']
        # print(self.mount_point)
        print(self.room_group_name)
        # if self.mount_point:
        #     print("Client Trying to  Connect ")
        # else:
        #     print("Server is trying to Connect")
        
        # if not validate_mount_point(self.mount_point):
        #     print("Invalid Client")
        #     self.close()
            
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
    

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json
        print("In Recieve Conncetions")
        logger.info("Received message in Volume %s: %s", self.room_group_name, message)
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type':'gnss_corrections_transfer',
                'data':message
            }
        )

    def gnss_corrections_transfer(self, event):
        message = event['data']
        print("--------Event while Chat message---------")
        print(event)
        logger.info("GNSS corrections transferred in room %s: %s", self.room_group_name, message)
        self.send(text_data=json.dumps({
            # 'type':'RTK Corrections ',
            'RTK Corrections':message
        }))