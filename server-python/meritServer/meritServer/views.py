from django.http import HttpResponse

def main(request):
    html = "<html><body>server is alive lmao</body></html>"
    return HttpResponse(html)
