from .services import Score


def new_event_listener(event):
    topic = event.topic
    key = event.key
    data = event.value

    if topic == 'contests':
        Score().handle_event(key=key, data=data)
