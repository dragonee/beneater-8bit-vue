from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from django.conf import settings
from django.urls import reverse_lazy
from django.views.generic import RedirectView, TemplateView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', TemplateView.as_view(template_name='hello_world.html')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# Debug Toolbar.
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls))
    ]
