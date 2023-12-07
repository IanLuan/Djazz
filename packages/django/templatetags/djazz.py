from django import template
from django.template.defaultfilters import json_script

register = template.Library()

@register.simple_tag(takes_context=True)
def djazz(context):
    forms = context.get('forms')
    if forms:
        forms_json = {}
        for form_name, form in forms.items():
            forms_json[form_name] = {}
            attrs = getattr(form, 'djazz', {})

            for field in form:
                forms_json[form_name][field.name] = {}
                forms_json[form_name][field.name]['label'] = field.label
                forms_json[form_name][field.name]['name'] = field.name
                forms_json[form_name][field.name]['required'] = field.field.required
                forms_json[form_name][field.name]['field'] = str(field)
                forms_json[form_name][field.name]['attrs'] = attrs.get(field.name)

        return json_script(forms_json, 'djazz-script')