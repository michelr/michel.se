import os
from datetime import datetime, timedelta

import markdown2
from flask import Flask, request, render_template
from flask_cors import cross_origin
from jinja2 import Environment, FileSystemLoader
from dateutil.parser import parse
from werkzeug.serving import run_simple
from flask_cdn import CDN


THIS_DIR = os.path.dirname(os.path.abspath(__file__))
jenv = Environment(loader=FileSystemLoader(THIS_DIR), trim_blocks=True)

class FlaskStaticCors(Flask):
    @cross_origin()
    def send_static_file(self, filename):
        return super(FlaskStaticCors, self).send_static_file(filename)

#app = Flask(__name__)
app = FlaskStaticCors(__name__)
app.config['CDN_DOMAIN'] = 'cdn.michel.se'
app.config['CDN_HTTPS'] = True
CDN(app)


@app.route('/', methods=['GET'])
def index():
    render_data = {}
    render_data[u'title'] = 'Michel Radosavljevic'
    return render_template('index.html', context=render_data)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/blog', methods=['GET', 'POST'])
def category(blog_category="posts"):
    """
    Categories of items.
    Essentially a 'directory listing' page.
    Returns to the items to the 'index'.
    """
    try:
        items = []
        for filename in os.listdir(blog_category):
            if 'index.md' in filename:
                continue
            if filename[-3:] == '.py':
                continue
            item = markdown2.markdown_path(blog_category + '/' + filename, extras=["metadata"])
            item.metadata['slug'] = filename.split('/')[-1].replace('.md', '')
            items.append(item)

        template = 'templates/category.html'
        render_data = {}
        render_data[u'title'] = 'Michel Radosavljevic'
        render_data[u'blog_category'] = 'posts'
        render_data[u'items'] = sorted(
            items, key=lambda item: parse(item.metadata.get('date_created', '')),
            reverse=True)

        rendered = jenv.get_template(template).render(render_data)
        return rendered

    except IOError as ex:
        print(ex)
        return render_template('404.html'), 404


if __name__ == '__main__':
    app.jinja_env.auto_reload = True
    app.config['CDN_DEBUG'] = True
    app.config["TEMPLATE_AUTO_RELOAD"] = True
    run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True)
