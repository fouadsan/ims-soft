from .models import Event

def get_context(request):
    event = Event.objects.first()
    context = {
        'event': event
    }
    return context