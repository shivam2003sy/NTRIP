from celery import shared_task
import logging

logger = logging.getLogger(__name__)

@shared_task(name ='mywebsite.chat.tasks.add')
def add():
    logger.info("Executing check_worker_status task")
    # Your task logic here
    print("Hiiiiiiiiiiiiiiii")
    result = "Worker is running"
    logger.info(f"Task result: {result}")
    return result
